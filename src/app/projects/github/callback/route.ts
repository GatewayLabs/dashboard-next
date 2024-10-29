import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/projects/github/login');
  }

  const tokenResponse = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );
  const { access_token } = await tokenResponse.json();

  if (!access_token) {
    return NextResponse.redirect(new URL('/projects/github', request.url));
  }

  const redirectUrl = new URL('/projects/github/mydata', request.url);
  redirectUrl.searchParams.set('token', access_token);

  return NextResponse.redirect(redirectUrl);
}
