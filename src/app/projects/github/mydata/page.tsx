'use client';

import { useEffect } from 'react';

import { PageWithSearchParams } from '@/types/next';
import { useLocalStorageValue } from '@react-hookz/web';
import { FaGithub } from 'react-icons/fa';

import { Button } from '@mui/material';

import GithubLayout from '../components/github-layout';
import Asset from './components/asset';
import User from './components/user';

export default function MyDataPage({
  searchParams,
}: PageWithSearchParams<{ token?: string }>) {
  const searchParamsToken = searchParams?.token;
  const { value, set, remove } = useLocalStorageValue<string>('github-token', {
    initializeWithValue: false,
  });
  const token = searchParamsToken ?? value;

  useEffect(() => {
    if (searchParamsToken) {
      set(searchParamsToken);
    }
  }, [searchParamsToken, set]);

  return (
    <GithubLayout>
      {token ? (
        <>
          <User token={token} remove={remove} />
          <Asset token={token} />
        </>
      ) : (
        <Button
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=repo,user`}
          variant="outlined"
          startIcon={<FaGithub />}
          size="large"
        >
          Sign in with Github
        </Button>
      )}
    </GithubLayout>
  );
}
