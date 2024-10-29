import { CalculateOutlined } from '@mui/icons-material';
import { Button, Card, Stack, Typography } from '@mui/material';
import ComputeCard from './compute-card';
import ComputeOperations from './compute-operations';
import { BiRightArrow } from 'react-icons/bi';

export default function Compute() {
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
      <Button
        variant="contained"
        size="large"
        sx={{ alignSelf: 'flex-start', mt: 3 }}
        endIcon={<BiRightArrow />}
      >
        Compute now
      </Button>
    </Stack>
  );
}
