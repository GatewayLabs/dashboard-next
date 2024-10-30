'use client';

import { PageWithSearchParams } from '@/types/next';

import { Stack } from '@mui/system';

import GithubLayout from '../components/github-layout';
import Compute from './components/compute';
import ShareYourData from './components/share-your-data';

export default function MyDataPage({
  searchParams,
}: PageWithSearchParams<{ token?: string }>) {
  return (
    <GithubLayout>
      <Stack direction="column" gap={4}>
        <ShareYourData searchParamsToken={searchParams?.token} />
        <Compute />
      </Stack>
    </GithubLayout>
  );
}
