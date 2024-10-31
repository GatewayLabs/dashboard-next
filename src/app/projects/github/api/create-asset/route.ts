import { NextRequest, NextResponse } from 'next/server';

import { authApi } from '@/services/api/api';
import { TypesAccessLevel } from '@/services/api/types';

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

export async function POST(req: NextRequest) {
  const { claim, did } = await req.json();
  if (!claim || !did) {
    return NextResponse.json('Claim or DID not found', { status: 400 });
  }

  const githubDataModelId = process.env.NEXT_PUBLIC_GITHUB_DATA_MODEL_ID;
  if (!githubDataModelId) {
    return NextResponse.json(
      { error: 'Github data model id not found' },
      { status: 500 }
    );
  }

  const body = {
    claim: claim as any,
    acl: [
      {
        address: did,
        roles: [
          TypesAccessLevel.RoleView,
          TypesAccessLevel.RoleUpdate,
          TypesAccessLevel.RoleDelete,
          TypesAccessLevel.RoleShare,
        ],
      },
    ],
    name: 'GitHub Data',
    data_model_id: parseInt(githubDataModelId),
    tags: ['github', 'user'],
  };

  const gatewayUserToken = await getGatewayUserToken();
  const { data, error } = await authApi(gatewayUserToken).POST('/data-assets', {
    body: body as any,
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
