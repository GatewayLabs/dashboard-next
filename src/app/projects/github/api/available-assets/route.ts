import { NextResponse } from 'next/server';

import { authApi } from '@/services/api/api';

const api = authApi(process.env.GATEWAY_USER_TOKEN!, {
  fetch: (request) => fetch({ ...request, cache: 'no-store' }),
});

export const GET = async () => {
  const { data, error } = await api.GET('/data-models/{id}/data-assets', {
    params: {
      path: { id: parseInt(process.env.NEXT_PUBLIC_GITHUB_DATA_MODEL_ID!) },
    },
  });

  if (error) {
    console.error('Error fetching data assets:', error);
    throw error;
  }

  return NextResponse.json({ total_items: data.meta.total_items });
};
