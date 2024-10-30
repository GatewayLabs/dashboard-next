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
    compute_field_name: '',
    compute_operation: DtoComputeRequestCreateRequestCompute_operation.add,
    title: 'Add',
    description: 'Add two numbers',
  },
];

export const GET = async (req: NextRequest) => {
  // Create compute requests for each operation
  const computeRequests = await Promise.all(
    operations.map(async (operation) => {
      try {
        const response = await api.POST('/compute-requests', {
          body: {
            ...operation,
            data_model_id: parseInt(
              process.env.NEXT_PUBLIC_GITHUB_DATA_MODEL_ID!
            ),
          },
        });
        return response;
      } catch (error) {
        console.error('Error creating compute request:', error);
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
      if (!computeRequest?.data?.id) {
        return null;
      }

      return await Promise.all(
        pdas.map(async (pda) => {
          try {
            return await api.POST('/compute-requests/{id}/accept', {
              params: { path: { id: computeRequest.data.id! } },
              body: { data_asset_id: pda.id },
            });
          } catch (error) {
            console.error('Error accepting compute request:', error);
            return null;
          }
        })
      );
    })
  );

  // Filter out failed requests
  const successfulAccepts = acceptedRequests
    .filter(Boolean)
    .flatMap((r) => r?.filter(Boolean).flatMap((r) => r?.data) ?? []);

  return NextResponse.json(successfulAccepts);
};
