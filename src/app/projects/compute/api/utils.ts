let gatewayUserToken: string | null = null;

export async function getGatewayUserToken(): Promise<string | null> {
  if (gatewayUserToken) {
    return gatewayUserToken;
  }

  const baseURL = process.env.NEXTAUTH_URL;
  if (!baseURL) {
    console.error(
      'Error: NEXTAUTH_URL is not defined in the environment variables'
    );
    throw new Error('NEXTAUTH_URL is not defined');
  }

  const fullURL = `${baseURL}/projects/github/api/login-gateway`;

  try {
    const gatewayLogin = await fetch(fullURL);
    if (!gatewayLogin.ok) {
      console.error(
        `Error fetching login-gateway: Status ${gatewayLogin.status} - ${gatewayLogin.statusText}`
      );
      throw new Error(
        `Failed to fetch login-gateway: ${gatewayLogin.statusText}`
      );
    }

    const data = await gatewayLogin.json();
    if (!data || !data.token) {
      console.error('Error: Gateway user token not found in response');
      throw new Error('Gateway user token not found');
    }

    gatewayUserToken = data.token;
    return gatewayUserToken;
  } catch (error) {
    console.error('Error fetching gateway user token:', error);
    throw new Error('Failed to obtain gateway user token');
  }
}
