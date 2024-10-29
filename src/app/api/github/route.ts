import { NextRequest, NextResponse } from 'next/server';

import { authApi } from '@/services/api/api';
import { TypesAccessLevel } from '@/services/api/types';

export async function POST(req: NextRequest) {
  const { claim, did } = await req.json();
  if (!claim || !did) {
    return NextResponse.json('Claim or DID not found', { status: 400 });
  }

  const gatewayUserToken = process.env.GATEWAY_USER_TOKEN;
  if (!gatewayUserToken) {
    return NextResponse.json(
      { error: 'Gateway user token not found' },
      { status: 500 }
    );
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

  const { data, error } = await authApi(gatewayUserToken).POST('/data-assets', {
    body: body as any,
  });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}
