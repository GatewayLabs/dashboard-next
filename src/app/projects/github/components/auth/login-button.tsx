'use client';

import { useSession } from 'next-auth/react';
import { Suspense, useState } from 'react';

import routes from '@/constants/routes';
import WalletConnectionProvider from '@/services/wallets/wallet-connection-provider';

import { Button } from '@mui/material';

import AuthenticationWalletModals from '../../../../components/authentication-wallet-modals';

export default function LoginButton() {
  const [isModalWaleltOpen, setIsModalWalletOpen] = useState(false);
  const { status } = useSession();
  const { data: session } = useSession();

  const PrimaryButton = {
    label: 'Open dashboard',
    variant: 'contained' as const,
    sx: { alignSelf: 'flex-start' },
    ...(status === 'authenticated'
      ? { href: routes.projects.github.mydata }
      : {
          onClick: () => {
            setIsModalWalletOpen(true);
          },
        }),
  };

  return (
    <>
      {!session?.user && (
        <>
          <Button {...PrimaryButton} size="large">
            Start Now
          </Button>
          <Suspense fallback={null}>
            <WalletConnectionProvider>
              <AuthenticationWalletModals
                isOpen={isModalWaleltOpen}
                onCancel={() => setIsModalWalletOpen(false)}
              />
            </WalletConnectionProvider>
          </Suspense>
        </>
      )}
    </>
  );
}
