'use client';
import { LoadingButton } from '@/components/buttons/loading-button';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { BiRightArrow } from 'react-icons/bi';

import { CalculateOutlined } from '@mui/icons-material';
import { Card, Stack, Typography } from '@mui/material';

import ComputeCard from './compute-card';
import ComputeOperations from './compute-operations';

export default function Compute() {
  const { enqueueSnackbar } = useSnackbar();
  const { isPending, isSuccess, error, mutateAsync } = useMutation({
    mutationKey: ['compute'],
    mutationFn: async () => {
      const response = await fetch('/projects/github/api/compute');
      if (!response.ok) {
        throw new Error('Failed to fetch compute data');
      }

      const data = await response.json();
      return data;
    },
  });

  const onCompute = async () => {
    try {
      await mutateAsync();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Stack component={Card} variant="outlined" p={3} gap={3}>
      <Stack direction="row" alignItems="center" gap={2}>
        <CalculateOutlined color="primary" sx={{ fontSize: 40 }} />
        <Stack direction="column" gap={0.5}>
          <Typography variant="h5">Compute data</Typography>
          <Typography variant="body2">
            All computations are performed on encrypted data using Garbled
            Circuits.
          </Typography>
        </Stack>
      </Stack>
      <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <ComputeCard label="Available data assets" value="131" />
        <ComputeCard label="Compute requests created" value="23" />
      </Stack>
      <ComputeOperations />
      <LoadingButton
        variant="contained"
        size="large"
        sx={{ alignSelf: 'flex-start', mt: 3 }}
        endIcon={<BiRightArrow />}
        disabled={isPending}
        isLoading={isPending}
        onClick={() => onCompute()}
      >
        Compute now
      </LoadingButton>
      {error && (
        <Typography color="error" sx={{ alignSelf: 'flex-start' }}>
          {error.message}
        </Typography>
      )}
      {isSuccess && (
        <Typography color="success" sx={{ alignSelf: 'flex-start' }}>
          Data computed successfully
        </Typography>
      )}
    </Stack>
  );
}
