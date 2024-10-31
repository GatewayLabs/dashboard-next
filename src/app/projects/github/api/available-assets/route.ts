import { NextResponse } from 'next/server';

import { authApi } from '@/services/api/api';

import { getGatewayUserToken } from '../utils';

export const GET = async () => {
  try {
    const gatewayUserToken = await getGatewayUserToken();
    const api = authApi(gatewayUserToken, { cache: 'no-cache' });

    const githubDataModelId = process.env.NEXT_PUBLIC_GITHUB_DATA_MODEL_ID;
    if (!githubDataModelId) {
      throw new Error(
        'NEXT_PUBLIC_GITHUB_DATA_MODEL_ID is not defined in the environment variables'
      );
    }

    const { data, error } = await api.GET('/data-models/{id}/data-assets', {
      params: {
        path: { id: parseInt(githubDataModelId) },
      },
    });

    if (error) {
      console.error('Error fetching data assets:', error);
      return NextResponse.json(
        { error: 'Failed to fetch data assets' },
        { status: 500 }
      );
    }

    return NextResponse.json({ total_items: data.meta.total_items });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};
