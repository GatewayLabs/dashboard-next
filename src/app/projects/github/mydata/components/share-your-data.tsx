/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect } from 'react';

import { useLocalStorageValue } from '@react-hookz/web';
import { FaGithub } from 'react-icons/fa';

import { IosShare } from '@mui/icons-material';
import { Button, Card, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import Asset from './asset';
import User from './user';

type Props = {
  searchParamsToken: string | undefined;
};

function ShareYourData({ searchParamsToken }: Props) {
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
    <Stack component={Card} variant="outlined">
      <Stack direction="row" alignItems="center" gap={2} p={3}>
        <IosShare color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="h5">Share your data</Typography>
      </Stack>
      <Stack divider={<Divider />}>
        <Stack p={3}>
          <Typography variant="subtitle1">
            Connect your Github account
          </Typography>
          <Typography
            variant="body2"
            mb={3}
            sx={(theme) => ({ color: theme.palette.text.secondary })}
          >
            Authorize the Gateway to access your data, you can cancel it
            whenever you want.
          </Typography>
          {token ? (
            <User token={token} remove={remove} />
          ) : (
            <Button
              variant="outlined"
              size="large"
              sx={{ alignSelf: 'flex-start' }}
              startIcon={<FaGithub />}
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=repo,user`}
            >
              Sign in with GitHub
            </Button>
          )}
        </Stack>
        <Stack p={3} alignItems="flex-start">
          <Typography variant="subtitle1">Create a data asset</Typography>
          <Typography
            variant="body2"
            mb={3}
            sx={(theme) => ({ color: theme.palette.text.secondary })}
          >
            We'll take the GitHub data and create a structured data asset to
            make available for private computation
          </Typography>
          <Asset token={token} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ShareYourData;
