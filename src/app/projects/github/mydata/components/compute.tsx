import { CalculateOutlined } from '@mui/icons-material';
import { Paper, Stack, Typography } from '@mui/material';

export default function Compute() {
  return (
    <Paper variant="outlined">
      <Stack direction="row" alignItems="center">
        <CalculateOutlined color="primary" height={40} />
        <Stack direction="column" gap={0.5}>
          <Typography variant="h5">Compute data</Typography>
          <Typography variant="body2">
            All computations are performed on encrypted data using Garbled
            Circuits.
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
