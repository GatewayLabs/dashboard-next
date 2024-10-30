'use client';

import { BiRightArrow } from 'react-icons/bi';

import { CalculateOutlined } from '@mui/icons-material';
import {
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
      <Button
        variant="contained"
        size="large"
        sx={{ alignSelf: 'flex-start', mt: 3 }}
        endIcon={isLoading ? <CircularProgress size={16} /> : <BiRightArrow />}
        disabled={isLoading}
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
