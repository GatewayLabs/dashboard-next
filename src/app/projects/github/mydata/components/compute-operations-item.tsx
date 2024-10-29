import { Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  description?: string;
};

export default function ComputeOperationsItem({ label, description }: Props) {
  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: 3,
      }}
    >
      <Typography variant="body1">{label}</Typography>
      {description && <Typography variant="body2">{description}</Typography>}
    </Stack>
  );
}
