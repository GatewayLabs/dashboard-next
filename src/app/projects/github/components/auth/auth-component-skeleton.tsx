import { Box, Skeleton } from '@mui/material';
import { Stack } from '@mui/system';

export default function AuthComponentSkeleton() {
  return (
    <Box
      sx={{
        p: 2,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        width: 300,
      }}
    >
      <Stack
        sx={{
          mr: 2,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'self-end',
        }}
      >
        <Skeleton sx={{ width: 150, height: 30 }} />
        <Skeleton sx={{ width: 100, height: 20 }} />
      </Stack>

      <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
    </Box>
  );
}
