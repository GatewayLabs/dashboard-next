'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import routes from '@/constants/routes';

import {
  LogoutOutlined,
  OpenInNew,
  SettingsOutlined,
} from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

type Props = {
  onClick: () => void;
};

export default function AuthDropdown({ onClick }: Props) {
  const onSignOut = async () => {
    await signOut({
      callbackUrl: routes.projects.github.home,
    });
  };

  return (
    <>
      <MenuItem component={Link} href={routes.dashboard.home} onClick={onClick}>
        <ListItemIcon>
          <OpenInNew />
        </ListItemIcon>
        <ListItemText>Open Dashboard</ListItemText>
      </MenuItem>
      <MenuItem
        component={Link}
        href={routes.dashboard.settings}
        onClick={onClick}
      >
        <ListItemIcon>
          <SettingsOutlined />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
      <MenuItem onClick={onSignOut}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText>Disconnect</ListItemText>
      </MenuItem>
    </>
  );
}