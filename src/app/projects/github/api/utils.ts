let gatewayUserToken: string | null = null;

export async function getGatewayUserToken(): Promise<string> {
  if (gatewayUserToken) {
    return gatewayUserToken;
  }

  const url = process.env.NEXTAUTH_URL;
  if (!url) {
    throw new Error('NEXTAUTH_URL is not defined in the environment variables');
  }

  try {
    const gatewayLogin = await fetch(
      `${url}/projects/github/api/login-gateway`
    );
    if (!gatewayLogin.ok) {
      throw new Error(
        `Failed to fetch login-gateway: ${gatewayLogin.statusText}`
      );
    }

    const data = (await gatewayLogin.json()) as { token: string };
    if (!data || !data.token) {
      throw new Error('Gateway user token not found');
    }

    gatewayUserToken = data.token;
    return gatewayUserToken;
  } catch (error) {
    console.error('Error fetching gateway user token:', error);
    throw new Error('Failed to obtain gateway user token');
  }
}
