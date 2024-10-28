'use client';
import Logo from '@/components/logo/logo';
import routes from '@/constants/routes';

import { Stack } from '@mui/system';

import AuthComponent from './auth/auth-component';

function Header() {
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 112,
      }}
    >
      <Logo href={routes.projects.github.home} />
      <AuthComponent id="github-header-auth" controlId="github-header-auth" />
    </Stack>
  );
}

export default Header;
