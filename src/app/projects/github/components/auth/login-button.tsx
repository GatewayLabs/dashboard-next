'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { Suspense, useState } from 'react';

import routes from '@/constants/routes';
import WalletConnectionProvider from '@/services/wallets/wallet-connection-provider';

import { Button } from '@mui/material';

import AuthenticationWalletModals from '../../../../components/authentication-wallet-modals';

export default function LoginButton() {
  const [isModalWaleltOpen, setIsModalWalletOpen] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  const PrimaryButton = {
    label: 'Open dashboard',
    variant: 'contained' as const,
    sx: { alignSelf: 'flex-start' },
    ...(status === 'authenticated'
      ? { href: routes.projects.github.mydata }
      : {
          onClick: () => {
            router.push(
              `${routes.projects.github.home}?callbackUrl=${routes.projects.github.mydata}`
            );
            setIsModalWalletOpen(true);
          },
        }),
  };

  return (
    <>
      <Button {...PrimaryButton}>Start Now</Button>
      <Suspense fallback={null}>
        <WalletConnectionProvider>
          <AuthenticationWalletModals
            isOpen={isModalWaleltOpen}
            onCancel={() => setIsModalWalletOpen(false)}
          />
        </WalletConnectionProvider>
      </Suspense>
    </>
  );
}
