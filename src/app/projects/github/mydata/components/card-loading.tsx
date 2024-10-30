import { CircularProgress, Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  description: string;
};

export default function CardLoading({ label, description }: Props) {
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
      <Typography variant="subtitle1">{label}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Stack>
  );
}
