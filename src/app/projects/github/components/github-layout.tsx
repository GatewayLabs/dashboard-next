'use client';

import { PropsWithChildren } from 'react';

import { Box, Container } from '@mui/material';
import { Stack } from '@mui/system';

import Header from './header';

export default function GithubLayout({ children }: PropsWithChildren) {
  return (
    <Container component={Stack}>
      <Box
        width="100%"
        sx={{
          pt: 5,
          pb: 4,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Header />
        {children}
      </Box>
    </Container>
  );
}
