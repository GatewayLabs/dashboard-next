'use client';
import Logo from '@/components/logo/logo';
import routes from '@/constants/routes';

import { Stack } from '@mui/system';

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
    </Stack>
  );
}

export default Header;
