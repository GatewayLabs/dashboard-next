import { NextRequest, NextResponse } from 'next/server';

import { authApi } from '@/services/api/api';
import {
  components,
  DtoComputeRequestCreateRequestCompute_operation,
} from '@/services/api/types';

const api = authApi(process.env.GATEWAY_USER_TOKEN!);
const operations: Omit<
  components['schemas']['dto.ComputeRequestCreateRequest'],
  'data_model_id'
>[] = [
  {
    compute_field_name: 'languages',
    compute_operation:
      DtoComputeRequestCreateRequestCompute_operation.greater_than_or_equal,
    title: 'Most used language',
    description:
      'Show number of devs who have more than 60% of their code in each language',
  },
  {
    compute_field_name: 'repos',
    compute_operation:
      DtoComputeRequestCreateRequestCompute_operation.greater_than,
    title: 'More popular repositories',
    description:
      'Compare the number of stars above 20 to identify which projects are more popular',
  },
  {
    compute_field_name: 'repos',
    compute_operation:
      DtoComputeRequestCreateRequestCompute_operation.less_than,
    title: 'Less popular repositories',
    description:
      'Compare the number of stars less than 2 to identify which projects are less popular',
  },
  {
    compute_field_name: 'followers',
    compute_operation:
      DtoComputeRequestCreateRequestCompute_operation.greater_than,
    title: 'Famous profiles',
    description: 'Show number of profiles that have more than 1000 followers',
  },
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

export const GET = async (req: NextRequest) => {
  // Create compute requests for each operation
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
  const successfulRequests = computeRequests.filter(Boolean);

  // Get all pdas from data_model_id
  const pdas: components['schemas']['dto.PublicDataAsset'][] = [];
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

  // Accept all pdas for all compute requests
  const acceptedRequests = await Promise.all(
    successfulRequests.map(async (computeRequest) => {
      if (!computeRequest?.id) {
        return [];
      }

      return await Promise.all(
        pdas.map(async (pda) => {
          try {
            const { data, error } = await api.POST(
              '/compute-requests/{id}/accept',
              {
                params: { path: { id: computeRequest.id! } },
                body: { data_asset_id: pda.id },
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
    })
  );

  // TODO: Start each compute request
  const successfulAccepts = acceptedRequests
    .filter(Boolean)
    .flatMap((r) => r?.filter(Boolean).flatMap((r) => r) ?? []);
  return NextResponse.json({});
};
