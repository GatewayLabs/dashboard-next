import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

type Props = {
  title: string;
  description: string;
};

export default function TextData({ title, description }: Props) {
  return (
    <Stack direction="column" gap={4} sx={{ width: { xs: '100%', md: '50%' } }}>
      <Typography variant="h4">{title}</Typography>
      <Typography>{description}</Typography>
    </Stack>
  );
}
