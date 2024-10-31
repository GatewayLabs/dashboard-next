'use client';

import { useQuery } from '@tanstack/react-query';
import { BiRightArrow } from 'react-icons/bi';

import { CalculateOutlined } from '@mui/icons-material';
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import CardLoading from './card-loading';
import ComputeCard from './compute-card';
import ComputeOperations from './compute-operations';
import useCompute from './use-compute';

export default function Compute() {
  const { isLoading, isSuccess, label, onCompute } = useCompute();
  const { data: availableAssets } = useQuery({
    queryKey: ['compute-available-assets'],
    queryFn: async () => {
      const res = await fetch('/projects/github/api/available-assets');
      const data = (await res.json()) as { total_items: number };
      return data.total_items.toString() || '0';
    },
  });
  const { data: computedCreated } = useQuery({
    queryKey: ['compute-created'],
    queryFn: async () => {
      const res = await fetch('/projects/github/api/computes-created');
      const data = (await res.json()) as { total_items: number };
      return data.total_items.toString();
    },
  });

  return (
    <Stack component={Card} variant="outlined" p={3} gap={3}>
      <Stack direction="row" alignItems="center" gap={2}>
        <CalculateOutlined color="primary" sx={{ fontSize: 40 }} />
        <Stack direction="column">
          <Typography variant="h5">Compute data</Typography>
          <Typography
            variant="body2"
            sx={(theme) => ({ color: theme.palette.text.secondary })}
          >
            All computations are performed on encrypted data using Garbled
            Circuits.
          </Typography>
        </Stack>
      </Stack>
      <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <ComputeCard label="Available data assets" value={availableAssets} />
        <ComputeCard label="Compute requests created" value={computedCreated} />
      </Stack>
      {!isLoading && <ComputeOperations data={isSuccess} />}
      {isLoading && (
        <Stack
          component={Card}
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative',
            height: 500,
          }}
        >
          <CardLoading label={label} description="This will take a while" />
        </Stack>
      )}
      {!!availableAssets && parseInt(availableAssets!) < 5 && (
        <Alert severity="warning" sx={{ alignItems: 'center' }}>
          <Stack sx={{ ml: 1 }}>
            <Typography>Private computing is unavailable</Typography>
            Must have 5 more GitHub data assets
          </Stack>
        </Alert>
      )}
      <Button
        variant="contained"
        size="large"
        sx={{ alignSelf: 'flex-start', mt: 3 }}
        endIcon={isLoading ? <CircularProgress size={16} /> : <BiRightArrow />}
        disabled={
          isLoading || (!!availableAssets && parseInt(availableAssets!) < 5)
        }
        onClick={onCompute}
      >
        Compute now
      </Button>
      {/* {error && (
        <Typography color="error" sx={{ alignSelf: 'flex-start' }}>
          {error.message}
        </Typography>
      )}
      {isSuccess && (
        <Typography color="success" sx={{ alignSelf: 'flex-start' }}>
          Data computed successfully
        </Typography>
      )} */}
    </Stack>
  );
}
