import { NextResponse } from 'next/server';

import { authApi } from '@/services/api/api';

let gatewayUserToken: string | null = null;

async function getGatewayUserToken(): Promise<string> {
  if (gatewayUserToken) {
    return gatewayUserToken;
  }

  const url = process.env.NEXTAUTH_URL;
  const gatewayLogin = await fetch(`${url}/projects/github/api/login-gateway`);
  const data = (await gatewayLogin.json()) as { token: string };
  if (!data || !data.token) {
    throw new Error('Gateway user token not found');
  }

  gatewayUserToken = data.token;
  return gatewayUserToken;
}

export const GET = async () => {
  const gatewayUserToken = await getGatewayUserToken();
  const api = authApi(gatewayUserToken, { cache: 'no-cache' });

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
