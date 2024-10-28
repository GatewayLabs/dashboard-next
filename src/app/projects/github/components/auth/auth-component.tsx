'use client';

import { useSession } from 'next-auth/react';

import AuthComponentSkeleton from '@/app/dashboard/components/auth-component/auth-component-skeleton';
import AuthDropdown from '@/app/dashboard/components/auth-component/auth-dropdown';
import { useMenu } from '@/hooks/use-menu';
import { limitCharsOffset } from '@/utils/string';

import { ButtonBase, Menu } from '@mui/material';

import UserOrgInfo from './user-org-info';

type Props = {
  id: string;
  controlId: string;
  onCloseSidebar?: () => void;
};

export default function AuthComponent({
  id,
  controlId,
  onCloseSidebar,
}: Props) {
  const { data: session } = useSession();

  const { isOpen, onOpen, onClose, element: anchorEl } = useMenu();

  if (!session?.user) {
    return <AuthComponentSkeleton />;
  }

  const onClick = () => {
    onClose();
    onCloseSidebar?.();
  };

  return (
    <>
      <ButtonBase
        id={id}
        aria-controls={isOpen ? controlId : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        sx={{
          justifyContent: 'space-between',
          p: 2,
          textAlign: 'right',
          flexDirection: 'row',
        }}
        onClick={onOpen}
      >
        <UserOrgInfo
          id={session.user.did}
          image={session.user.profile_picture}
          name={session.user.username}
          gatewayId={limitCharsOffset(session.user.did!, 10, 5)!}
        />
      </ButtonBase>
      <Menu
        id={controlId}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': id,
          sx: {
            minWidth: 305,
          },
        }}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        sx={{
          '.MuiListItemIcon-root': {
            minWidth: (theme) => `${theme.spacing(5 + 1.5)} !important`,
          },
        }}
      >
        <AuthDropdown onClick={onClick} />
      </Menu>
    </>
  );
}
