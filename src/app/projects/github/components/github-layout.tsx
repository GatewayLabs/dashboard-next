'use client';

import { PropsWithChildren } from 'react';

import Footer from '@/components/footer/footer';

import { Box, Container } from '@mui/material';
import { Stack } from '@mui/system';

import Header from './header';

export default function GithubLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Container component={Stack}>
        <Box
          width="100%"
          sx={{
            pb: 2,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Header />
          <Box sx={{ minHeight: 400 }}>{children}</Box>
        </Box>
      </Container>
      <Footer color="transparent" />
    </>
  );
}
