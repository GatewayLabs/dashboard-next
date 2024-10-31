let gatewayUserToken: string | null = null;

export async function getGatewayUserToken(): Promise<string | null> {
  if (gatewayUserToken) {
    if (!gatewayUserToken) {
      throw new Error('Gateway user token is null');
    }
    return gatewayUserToken;
  }

  const url = process.env.NEXTAUTH_URL;
  if (!url) {
    console.error('NEXTAUTH_URL is not defined');
    throw new Error('NEXTAUTH_URL is not defined');
  }

  if (typeof window === 'undefined') {
    try {
      const gatewayLogin = await fetch(
        `${url}/projects/github/api/login-gateway`
      );
      if (!gatewayLogin.ok) {
        console.error(`Error fetching login-gateway: ${gatewayLogin.status}`);
        throw new Error(
          `Failed to fetch login-gateway: ${gatewayLogin.statusText}`
        );
      }

      const data = await gatewayLogin.json();
      if (!data || !data.token) {
        console.error('Gateway user token not found');
        throw new Error('Gateway user token not found');
      }

      gatewayUserToken = data.token;
    } catch (error) {
      console.error('Error fetching gateway user token:', error);
      throw new Error('Failed to obtain gateway user token');
    }
  }

  return gatewayUserToken;
}
