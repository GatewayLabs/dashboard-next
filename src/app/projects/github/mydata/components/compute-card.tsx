import { brandColors } from '@/theme/config/brand';

import { Card, Skeleton, Typography } from '@mui/material';

type Props = {
  label: string;
  value?: string;
};

export default function ComputeCard({ label, value }: Props) {
  return (
    <Card
      sx={{
        flexGrow: 1,
        backgroundColor: brandColors.primaryLight,
        boxShadow: 'none',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        p: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={(theme) => ({
          opacity: 0.6,
          color: theme.palette.primary.dark,
        })}
      >
        {label}
      </Typography>
      <Typography
        variant="h5"
        sx={(theme) => ({
          color: theme.palette.primary.dark,
        })}
      >
        {value ?? <Skeleton variant="text" width={100} />}
      </Typography>
    </Card>
  );
}
