import { Metadata } from 'next';
import { Session } from 'next-auth';
import Link from 'next/link';

import BannerIcon from '@/components/icons/banner';
import PDABannerIcon from '@/components/icons/pda-banner';
import PlaygroundIcon from '@/components/icons/playground';
import { home } from '@/locale/en/home';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

import { Box } from '@mui/material';
import { Button, Paper, Stack, Typography } from '@mui/material';

import SandboxAlert from '../../components/alerts/sandbox-alert';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `The Private Data Asset Network  - Gateway Network`,
  };
}

export default async function Home() {
  const session = (await getGtwServerSession()) as Session;
  return (
    <>
      {process.env.NEXT_PUBLIC_API_ENV === 'testnet' && <SandboxAlert />}
      <Typography variant="h3" marginBottom={4} gutterBottom>
        {home.greeting} {session?.user.displayName}
      </Typography>
      <Box
        component={Link}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
        height="40%"
        padding={2}
        bgcolor="primary.main"
        borderRadius={1}
        href={home.main_banner.link}
        target="_blank"
        sx={{ textDecoration: 'none' }}
      >
        <BannerIcon
          sx={{
            width: 246,
            height: 106,
            justifySelf: 'flex-start',
          }}
        />
        <Stack justifySelf="flex-end">
          <Typography variant="h4" color="common.white" gutterBottom>
            {home.main_banner.title}
          </Typography>
          <Typography variant="body2" color="common.white" gutterBottom>
            {home.main_banner.subtitle}
          </Typography>
          <div>
            <Button
              variant="text"
              size="large"
              sx={{ color: 'common.white', paddingX: 0, borderRadius: 0 }}
            >
              {home.main_banner.btn_text}
            </Button>
          </div>
        </Stack>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Paper
          component={Link}
          href={home.sub_banner[0].link}
          target="_blank"
          variant="outlined"
          sx={{
            padding: 1.5,
            width: '100%',
            mr: 3,
            marginTop: 2,
            textDecoration: 'none',
          }}
        >
          <PDABannerIcon sx={{ width: 115.82, height: 72 }} />
          <Typography mt={2} variant="h5" width={222} gutterBottom>
            {home.sub_banner[0].title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {home.sub_banner[0].subtitle}
          </Typography>
          <Button
            variant="text"
            size="large"
            sx={{ paddingX: 0, borderRadius: 0, marginTop: 1 }}
          >
            {home.sub_banner[0].btn_text}
          </Button>
        </Paper>
        <Paper
          component={Link}
          href={home.sub_banner[1].link}
          variant="outlined"
          sx={{
            padding: 1.5,
            width: '100%',
            marginTop: 2,
            textDecoration: 'none',
          }}
        >
          <PlaygroundIcon sx={{ width: 84, height: 72 }} />
          <Typography mt={2} variant="h5" width={222} gutterBottom>
            {home.sub_banner[1].title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {home.sub_banner[1].subtitle}
          </Typography>
          <Button
            variant="text"
            size="large"
            sx={{ paddingX: 0, borderRadius: 0, marginTop: 1 }}
          >
            {home.sub_banner[1].btn_text}
          </Button>
        </Paper>
      </Box>
    </>
  );
}
