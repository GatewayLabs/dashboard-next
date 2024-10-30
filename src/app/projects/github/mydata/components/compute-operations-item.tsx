import { Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  description?: string;
  value?: number;
};

export default function ComputeOperationsItem({
  label,
  description,
  value,
}: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      px={3}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          flexGrow: 1,
        }}
      >
        <Typography variant="body1">{label}</Typography>
        {description && <Typography variant="body2">{description}</Typography>}
      </Stack>
      {value && (
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      )}
    </Stack>
  );
}
