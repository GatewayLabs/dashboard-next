export const createGithubDataAsset = async (claim: any, did: string) => {
  const response = await fetch('/projects/github/api/create-asset', {
    method: 'POST',
    body: JSON.stringify({ claim, did }),
  });

  if (!response.ok) {
    throw new Error('Failed to create data asset');
  }

  const dataAsset: string = await response.json();
  return dataAsset;
};
