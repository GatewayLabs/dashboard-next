'use client';

import { PageWithSearchParams } from '@/types/next';

import GithubLayout from '../components/github-layout';
import ShareYourData from './components/share-your-data';
import Compute from './components/compute';
import { Stack } from '@mui/system';

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
