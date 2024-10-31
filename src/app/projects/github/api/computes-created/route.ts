import { NextResponse } from 'next/server';

import { authApi } from '@/services/api/api';

import { getGatewayUserToken } from '../utils';

export const GET = async () => {
  try {
    const gatewayUserToken = await getGatewayUserToken();
    const api = authApi(gatewayUserToken, { cache: 'no-cache' });
    const { data, error } = await api.GET('/compute-requests/me');

    if (error) {
      console.error('Error fetching created compute requests:', error);
      return NextResponse.json(
        { error: 'Failed to fetch compute requests' },
        { status: 500 }
      );
    }

    return NextResponse.json({ total_items: data.meta.total_items });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
};
