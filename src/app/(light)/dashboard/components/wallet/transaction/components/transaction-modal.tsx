'use client';
import { useRouter } from 'next-nprogress-bar';
import { useMemo } from 'react';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import routes from '@/constants/routes';

import { Stack } from '@mui/system';

import { Transaction } from '../transaction';

type Props = {
  open: boolean;
  onClose: any;
  transactionDetail: any;
};

export function TransactionModal({ open, onClose, transactionDetail }: Props) {
  const router = useRouter();

  useMemo(() => {
    if (open) {
      router.push(routes.dashboardUserWallet, { scroll: false });
    } else {
      router.push('#transaction', { scroll: false });
    }
  }, [open]);

  return (
    <>
      <ModalRight open={open} onClose={onClose}>
        <ModalHeader onClose={onClose} />
        <Stack sx={{ pt: 3 }}>
          <Transaction {...transactionDetail} />
        </Stack>
      </ModalRight>
    </>
  );
}
