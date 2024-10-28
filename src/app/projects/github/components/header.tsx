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
        pb: 4,
        alignItems: 'center',
      }}
    >
      <Logo href={routes.projects.github.home} />
      <AuthComponent id="profile-button" controlId="profile-menu" />
    </Stack>
  );
}

export default Header;
