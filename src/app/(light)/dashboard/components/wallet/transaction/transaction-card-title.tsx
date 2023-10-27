'use client';

import { useMemo } from 'react';

import { transaction } from '@/locale/en/transaction';
import { numberToMoneyString } from '@/utils/money';

import { Stack, Typography, alpha } from '@mui/material';

type Props = {
  amount: number;
  type: string;
};

export default function TransactionCardTitle({ amount, type }: Props) {
  const bgColor = useMemo(() => {
    if (type === 'EXPENSE' || type === 'WITHDRAWAL') {
      return 'error';
    }
    return 'success';
  }, [type]);
  return (
    <Stack
      data-testid="transaction__title"
      sx={{
        borderRadius: 1,
        mb: 3,
        px: 2,
        py: 2,
        backgroundColor: (theme) => alpha(theme.palette[bgColor].light, 0.4),
      }}
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
      gap={1.5}
    >
      <Typography variant="caption" color="text.secondary">
        {transaction.total_amount}
      </Typography>
      <Typography
        variant="h3"
        id="total-amount-value"
        data-testid="transaction__title__amount"
      >
        {numberToMoneyString(amount)}
      </Typography>
    </Stack>
  );
}