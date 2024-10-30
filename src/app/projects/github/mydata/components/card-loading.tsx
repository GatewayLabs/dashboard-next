import { CircularProgress, Stack, Typography } from '@mui/material';

export default function CardLoading() {
  return (
    <Stack
      direction="column"
      sx={{
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F6F4FA',
      }}
    >
      <CircularProgress size={48} sx={{ color: 'primary.main', mb: 2 }} />
      <Typography variant="subtitle1">Creating a compute request</Typography>
      <Typography variant="body2">This will take a while</Typography>
    </Stack>
  );
}
