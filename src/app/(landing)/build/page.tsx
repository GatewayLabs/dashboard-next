'use client';

import { HeaderContextProvider } from '@/app/(landing)/contexts/header-context';

export default function BuildPage() {
  return (
    <HeaderContextProvider>
      <h1></h1>
    </HeaderContextProvider>
  );
}
