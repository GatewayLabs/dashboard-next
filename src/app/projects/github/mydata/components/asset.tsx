import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { LoadingButton } from '@/components/buttons/loading-button';
import routes from '@/constants/routes';
import { authApi } from '@/services/api/api';
import { PublicDataAsset } from '@/services/api/models';
import { Endpoints } from '@octokit/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { OpenInNew } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

import { createGithubDataAsset } from '../../utils';
import { PercentageLanguageCount, PercentageLanguageKey } from './types';

type GitHubUser = Endpoints['GET /user']['response']['data'];
type GitHubRepos = Endpoints['GET /user/repos']['response']['data'];
type GitHubIssues = Endpoints['GET /search/issues']['response']['data'];
type GitHubCommits = Endpoints['GET /search/commits']['response']['data'];
type GitHubPullRequests = Endpoints['GET /search/issues']['response']['data'];
const fetchGitHubData = async (accessToken: string) => {
  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    const userDataResponse = await fetch('https://api.github.com/user', {
      headers,
    });
    if (!userDataResponse.ok) throw new Error('Failed to fetch user data');
    const userData: GitHubUser = await userDataResponse.json();

    const reposResponse = await fetch('https://api.github.com/user/repos', {
      headers,
    });
    if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
    const reposData: GitHubRepos = await reposResponse.json();

    const repoStats = reposData.map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      language: repo.language,
    }));
    const totalRepos = repoStats.length;

    const languages = [
      ...new Set(repoStats.map((repo) => repo.language).filter(Boolean)),
    ];

    const issuesResponse = await fetch(
      `https://api.github.com/search/issues?q=author:${userData.login}+type:issue`,
      { headers }
    );
    if (!issuesResponse.ok) throw new Error('Failed to fetch issues');
    const issuesData: GitHubIssues = await issuesResponse.json();
    const totalIssues = issuesData.total_count;

    const pullRequestsResponse = await fetch(
      `https://api.github.com/search/issues?q=author:${userData.login}+type:pr`,
      { headers }
    );
    if (!pullRequestsResponse.ok)
      throw new Error('Failed to fetch pull requests');
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
    if (!commitsResponse.ok) throw new Error('Failed to fetch commits');
    const commitsData: GitHubCommits = await commitsResponse.json();
    const totalCommits = commitsData.total_count;

    const percentageLanguageCount = languages.reduce(
      (acc, language) => {
        const key = `percentageOfRepoIn${language}` as PercentageLanguageKey;
        const count = repoStats.filter(
          (repo) => repo.language === language
        ).length;
        acc[key] = Math.floor((count / totalRepos) * 100);
        return acc;
      },
      {
        percentageOfRepoInJavaScript: 0,
        percentageOfRepoInPython: 0,
        percentageOfRepoInJava: 0,
        percentageOfRepoInTypeScript: 0,
        percentageOfRepoInCSharp: 0,
        percentageOfRepoInCPP: 0,
        percentageOfRepoInPHP: 0,
        percentageOfRepoInShell: 0,
        percentageOfRepoInC: 0,
        percentageOfRepoInRuby: 0,
      } as PercentageLanguageCount
    );

    return {
      totalPullRequests,
      totalCommits,
      totalIssues,
      ...percentageLanguageCount,
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw error;
  }
};

type Props = {
  token?: string;
};

export default function Asset({ token: githubToken }: Props) {
  const { data: session } = useSession();
  const token = session?.token;
  const did = session?.user.did;
  const githubDataModelId = process.env.NEXT_PUBLIC_GITHUB_DATA_MODEL_ID;

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['github-data-asset', token, githubDataModelId],
    queryFn: async () => {
      if (!githubDataModelId) {
        throw new Error('Github data model id not found');
      }

      const { data } = await authApi(token!).GET(
        '/data-models/{id}/data-assets',
        { params: { path: { id: parseInt(githubDataModelId) } } }
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

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['github-pda', githubToken, did],
    mutationFn: async () => {
      const claim = await fetchGitHubData(githubToken ?? '');
      const data = await createGithubDataAsset(claim, did!);

      if (!data) {
        throw new Error('Failed to create data asset');
      }

      return data;
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const onCreateDataAsset = async () => {
    try {
      await mutateAsync();
      refetch();
      queryClient.refetchQueries({ queryKey: ['compute-available-assets'] });
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
      <>
        <Stack direction="row" gap={2}>
          <Button
            component={Link}
            href={routes.dashboard.storageAsset(data.id)}
            variant="outlined"
            size="large"
            endIcon={<OpenInNew />}
            target="_blank"
          >
            Open data asset
          </Button>
          <LoadingButton
            variant="contained"
            size="large"
            disabled={isPending || !githubToken}
            onClick={onCreateDataAsset}
            sx={{ opacity: 0 }}
          >
            Create data asset
          </LoadingButton>
        </Stack>
      </>
    );
  }

  return (
    <LoadingButton
      variant="contained"
      size="large"
      disabled={isPending || !githubToken}
      onClick={onCreateDataAsset}
    >
      Create data asset
    </LoadingButton>
  );
}
