import { NextResponse } from 'next/server';

import { authApi } from '@/services/api/api';
import { ethers } from 'ethers';

export async function GET() {
  const privateKey = process.env.GATEWAY_USER_PRIVATE_KEY;
  if (!privateKey) {
    return NextResponse.json(
      { error: 'Private key not found' },
      { status: 500 }
    );
  }

  const wallet = new ethers.Wallet(privateKey);

  const { data: messageData, error: messageError } = await authApi().GET(
    '/auth/message'
  );
  if (messageError || !messageData.message) {
    return NextResponse.json(
      { error: 'Failed to fetch auth message' },
      { status: 500 }
    );
  }

  const message = messageData.message;

  const signature = await wallet.signMessage(message);

  const authBody = {
    wallet_address: wallet.address,
    message: message,
    signature: signature,
  };

  const { data: authData, error: authError } = await authApi().POST('/auth', {
    body: authBody,
  });

  if (authError) {
    return NextResponse.json(authError, { status: 500 });
  }

  return NextResponse.json({ token: authData.token });
}
