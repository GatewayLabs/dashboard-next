import Image from 'next/image';

import { brandColors } from '@/theme/config/brand';

import { Box, Card, Chip, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import LoginButton from './auth/login-button';

import HeroImage from '/public/images/hero-github.png';

export default function Hero() {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="stretch"
      gap={2}
      mb={8}
    >
      <Card
        sx={{
          flexGrow: 1,
          backgroundColor: brandColors.primaryLight,
          boxShadow: 'none',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          p: 4,
        }}
      >
        <Chip
          label="Experiment"
          variant="outlined"
          color="primary"
          sx={{ mb: 3 }}
        />
        <Stack>
          <Typography variant="h2" mb={2} sx={{ fontSize: { xs: 34 } }}>
            Compute GitHub data using Gateway Encrypted Compute
          </Typography>
          <LoginButton />
        </Stack>
      </Card>
      <Box
        sx={{
          width: { xs: '100%', md: 437 },
          minWidth: { xs: 'auto', md: 437 },
          aspectRatio: '437/437',
          position: 'relative',
        }}
      >
        <Image
          src={HeroImage}
          alt="GitHub article hero image"
          placeholder="blur"
          quality={100}
          sizes="(max-width: 100%) 100%, 100vw"
          fill
          style={{
            objectFit: 'contain',
            objectPosition: 'center top',
          }}
        />
      </Box>
    </Stack>
  );
}
