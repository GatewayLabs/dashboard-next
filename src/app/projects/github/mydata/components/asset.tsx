import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { LoadingButton } from '@/components/buttons/loading-button';
import routes from '@/constants/routes';
import { authApi } from '@/services/api/api';
import { components, TypesAccessLevel } from '@/services/api/types';
import { Endpoints } from '@octokit/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { OpenInNew } from '@mui/icons-material';
import { Button } from '@mui/material';
import { PublicDataAsset } from '@/services/api/models';
import { createGithubDataAsset } from '../../utils';

type GitHubUser = Endpoints['GET /user']['response']['data'];
type GitHubRepos = Endpoints['GET /user/repos']['response']['data'];
type GitHubIssues = Endpoints['GET /search/issues']['response']['data'];
type GitHubCommits = Endpoints['GET /search/commits']['response']['data'];
type GitHubPullRequests = Endpoints['GET /search/issues']['response']['data'];

const fetchGitHubData = async (accessToken: string) => {
  const headers = { Authorization: `Bearer ${accessToken}` };

  const userDataResponse = await fetch('https://api.github.com/user', {
    headers,
  });
  const userData: GitHubUser = await userDataResponse.json();

  const reposResponse = await fetch('https://api.github.com/user/repos', {
    headers,
  });
  const reposData: GitHubRepos = await reposResponse.json();

  const repoStats = reposData.map((repo) => ({
    name: repo.name,
    stars: repo.stargazers_count,
    language: repo.language,
  }));
  const totalStars = repoStats.reduce((acc, repo) => acc + repo.stars, 0);
  const languages = [
    ...new Set(repoStats.map((repo) => repo.language).filter(Boolean)),
  ];

  const issuesResponse = await fetch(
    `https://api.github.com/search/issues?q=author:${userData.login}+type:issue`,
    { headers }
  );
  const issuesData: GitHubIssues = await issuesResponse.json();
  const totalIssues = issuesData.total_count;

  const pullRequestsResponse = await fetch(
    `https://api.github.com/search/issues?q=author:${userData.login}+type:pr`,
    { headers }
  );
  const pullRequestsData: GitHubPullRequests =
    await pullRequestsResponse.json();
  const totalPullRequests = pullRequestsData.total_count;

  const commitsResponse = await fetch(
    `https://api.github.com/search/commits?q=author:${userData.login}`,
    {
      headers: {
        ...headers,
        Accept: 'application/vnd.github.cloak-preview',
      },
    }
  );
  const commitsData: GitHubCommits = await commitsResponse.json();
  const totalCommits = commitsData.total_count;

  return {
    followers: userData.followers,
    totalPullRequests,
    totalCommits,
    totalIssues,
    repos: repoStats,
    totalStars,
    languages,
  };
};

type Props = {
  token?: string;
};

export default function Asset({ token: githubToken }: Props) {
  const { data: session } = useSession();
  const token = session?.token;
  const did = session?.user.did;

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['github-data-asset', token],
    queryFn: async () => {
      const { data } = await authApi(token!).GET(
        '/data-models/{id}/data-assets',
        { params: { path: { id: 6586373368709223 } } }
      );
      return data;
    },
    select: (data: any) => {
      const dataAssets = data.data as PublicDataAsset[];
      return dataAssets.find((asset) =>
        asset.acl.some((acl) => acl.did === did)
      );
    },
    enabled: !!session,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['github-pda', githubToken, did],
    mutationFn: async () => {
      const claim = await fetchGitHubData(githubToken ?? '');
      const dataAsset = await createGithubDataAsset(claim, did!);

      if (!dataAsset) {
        throw new Error('Failed to create data asset');
      }

      return dataAsset;
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const onCreateDataAsset = async () => {
    try {
      await mutateAsync();
      refetch();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  if (isLoading) {
    return (
      <Button variant="contained" size="large" disabled={true}>
        Loading...
      </Button>
    );
  }

  if (data) {
    return (
      <Button
        component={Link}
        href={routes.dashboard.storageAsset(data.id)}
        variant="outlined"
        size="large"
        endIcon={<OpenInNew />}
      >
        Open data asset
      </Button>
    );
  }

  return (
    <LoadingButton
      variant="contained"
      size="large"
      disabled={isPending}
      onClick={onCreateDataAsset}
    >
      Create data asset
    </LoadingButton>
  );
}
