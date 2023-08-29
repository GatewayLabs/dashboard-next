import { limitCharsCentered } from '@/utils/string';

import { Avatar, Divider, Stack, Typography } from '@mui/material';

export default function SharedWithCard({}) {
  const rows = [
    {
      name: 'Chase',
      data_proof_id:
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    },
    {
      name: 'Chase',
      data_proof_id: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    },
  ];
  return (
    <Stack
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 2,
        backgroundColor: 'common.white',
        maxWidth: 550,
        width: '100%',
        mx: 'auto',
      }}
    >
      <Typography
        sx={{ fontSize: 14, fontWeight: 600, p: 2, color: 'text.secondary' }}
      >
        Shared with
      </Typography>
      <Stack p={2} direction="row" justifyContent="space-between">
        <Typography variant="caption" color="text.secondary">
          Verifier
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Data proof ID
        </Typography>
      </Stack>
      <Stack divider={<Divider />}>
        {rows.map((row, index) => (
          <Stack
            p={2}
            key={index}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Avatar />
              <Typography variant="subtitle1">{row.name}</Typography>
            </Stack>
            <Typography variant="body2">
              {limitCharsCentered(row.data_proof_id, 8)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}