import { NextRequest, NextResponse } from 'next/server';

import { authApi } from '@/services/api/api';
import {
  components,
  DtoComputeRequestCreateRequestCompute_operation,
} from '@/services/api/types';

type ComputeRequest = components['schemas']['dto.ComputeRequestResponse'];
type DataAsset = components['schemas']['dto.PublicDataAsset'];

const api = authApi(process.env.GATEWAY_USER_TOKEN!);

const operations: Omit<
  components['schemas']['dto.ComputeRequestCreateRequest'],
  'data_model_id'
>[] = [
  {
    compute_field_name: 'totalPullRequests',
    compute_operation: DtoComputeRequestCreateRequestCompute_operation.sum,
    title: 'Sum of all pull requests',
    description: 'Sum of all pull requests',
  },
  {
    compute_field_name: 'totalCommits',
    compute_operation: DtoComputeRequestCreateRequestCompute_operation.sum,
    title: 'Sum of all commits',
    description: 'Sum of all commits',
  },
  {
    compute_field_name: 'totalIssues',
    compute_operation: DtoComputeRequestCreateRequestCompute_operation.sum,
    title: 'Sum of all issues',
    description: 'Sum of all issues',
  },
];

const languageVariables = [
  'repoInJavaScript',
  'repoInPython',
  'repoInJava',
  'repoInTypescript',
  'repoInCSharp',
  'repoInCPP',
  'repoInPHP',
  'repoInShell',
  'repoInC',
  'repoInRuby',
];

languageVariables.forEach((language) => {
  operations.push({
    compute_field_name: language,
    compute_operation: DtoComputeRequestCreateRequestCompute_operation.sum,
    title: `Sum of all projects in ${language}`,
    description: `Sum of all projects in ${language}`,
  });
});

async function createComputeRequests(): Promise<ComputeRequest[]> {
  const computeRequests = await Promise.all(
    operations.map(async (operation) => {
      try {
        const { data, error } = await api.POST('/compute-requests', {
          body: {
            ...operation,
            data_model_id: parseInt(
              process.env.NEXT_PUBLIC_GITHUB_DATA_MODEL_ID!
            ),
          },
        });
        if (error) {
          console.error(
            'Error creating compute request:',
            operation.title,
            error
          );
          return null;
        }

        console.log('Compute request created:', operation.title);

        return data;
      } catch (error) {
        console.error(
          'Error creating compute request:',
          operation.title,
          error
        );
        return null;
      }
    })
  );

  // Filter out failed requests
  const successfulRequests = computeRequests.filter((c) => !!c);
  return successfulRequests;
}

async function getDataAssets(): Promise<DataAsset[]> {
  const pdas: DataAsset[] = [];
  let page = 1;
  while (page > -1) {
    try {
      const { data, error } = await api.GET('/data-models/{id}/data-assets', {
        params: {
          path: { id: parseInt(process.env.NEXT_PUBLIC_GITHUB_DATA_MODEL_ID!) },
          query: { page: page },
        },
      });

      if (error) {
        console.error('Error fetching data assets:', error);
        break;
      }

      if (data.data) {
        pdas.push(...data.data);
      }
      if (data.meta.current_page < data.meta.total_pages) {
        page = data.meta.current_page + 1;
      } else {
        page = -1;
      }
    } catch (error) {
      console.error('Error fetching data assets:', error);
      break;
    }
  }

  return pdas;
}

const encoder = new TextEncoder();

async function* executeComputeRequests() {
  yield encoder.encode('Creating compute requests');
  // Create compute requests for each operation
  const computeRequest = await createComputeRequests();
  // yield computeRequest created

  // Get all pdas from data_model_id
  const pdas = await getDataAssets();
  // yield pdas fetched

  // Accept all pdas for all compute requests
  const acceptedRequests = await Promise.all(
    computeRequest.map(async (computeRequest) => {
      if (!computeRequest?.id) {
        return [];
      }

      try {
        const { data, error } = await api.POST(
          '/compute-requests/{id}/accept',
          {
            params: { path: { id: computeRequest.id! } },
            body: { data_asset_ids: pdas.map((pda) => pda.id) } as any,
          }
        );
        if (error) {
          console.error('Error accepting compute request:', error);
          return null;
        }
        return data;
      } catch (error) {
        console.error('Error accepting compute request:', error);
        return null;
      }
    })
  );

  // TODO: Start each compute request
  const successfulAccepts = acceptedRequests.filter(Boolean);

  yield encoder.encode('Compute encrypted data');

  //TODO: remove
  await new Promise((resolve) => setTimeout(resolve, 5000));
}

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

export const GET = async (req: NextRequest) => {
  const execution = executeComputeRequests();
  const stream = iteratorToStream(execution);

  return new Response(stream);
};
