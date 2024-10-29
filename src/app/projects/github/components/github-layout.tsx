'use client';

import { PropsWithChildren } from 'react';

import Footer from '@/components/footer/footer';

import { Box, Container } from '@mui/material';
import { Stack } from '@mui/system';

import Header from './header';

export default function GithubLayout({ children }: PropsWithChildren) {
  return (
    <Stack direction="column" sx={{ height: '100%' }}>
      <Container component={Stack} sx={{ flexGrow: 1 }}>
        <Header />
        <Box sx={{ minHeight: 400 }}>{children}</Box>
      </Container>
      <Footer color="transparent" />
    </Stack>
  );
}
