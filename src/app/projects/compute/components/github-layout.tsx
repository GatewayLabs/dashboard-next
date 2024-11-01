'use client';

import { PropsWithChildren } from 'react';

import Footer from '@/components/footer/footer';

import { Container } from '@mui/material';
import { Stack } from '@mui/system';

import Header from './header';
import Hero from './hero';

export default function GithubLayout({ children }: PropsWithChildren) {
  return (
    <Stack direction="column" sx={{ height: '100%' }}>
      <Container component={Stack} sx={{ flexGrow: 1 }}>
        <Header />
        <Hero />
        {children}
      </Container>
      <Footer color="transparent" />
    </Stack>
  );
}
