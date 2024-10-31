let gatewayUserToken: string | null = null;

export async function getGatewayUserToken(): Promise<string | null> {
  if (gatewayUserToken) {
    return gatewayUserToken;
  }

  if (process.env.SKIP_AUTH_FETCH_DURING_BUILD === 'true') {
    console.warn('Skipping gateway token fetch during build');
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaWQiOiJkaWQ6Z2F0ZXdheWlkOmdhdGV3YXk6OGQ1OTQ1YWQ4MjY4YzlhZjI2ZWMwNTkwYjMyNDM2OTQ1ZDBkNWY2NzQyOGQzMzNiNWYwMDJhMDNkZjA5NTVkOCIsImV4cCI6MTczMDY2NjQxMSwid2FsbGV0X2FkZHJlc3MiOiIweDlkRUM3ODcwY0JBNzVhQkM1NjI3YmY3MTM0NWFlZjMwOTVENGFjMmMifQ.gQcA-X1Mk3nED38B4Ts0rPy1vqJbm9PRLMdLpngQF1c';
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
