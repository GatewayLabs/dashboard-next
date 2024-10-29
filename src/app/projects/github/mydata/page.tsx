'use client';

import { PageWithSearchParams } from '@/types/next';

import GithubLayout from '../components/github-layout';
import ShareYourData from './components/share-your-data';
import Compute from './components/compute';

export default function MyDataPage({
  searchParams,
}: PageWithSearchParams<{ token?: string }>) {
  return (
    <GithubLayout>
      <ShareYourData searchParamsToken={searchParams?.token} />
      <Compute />
    </GithubLayout>
  );
}
