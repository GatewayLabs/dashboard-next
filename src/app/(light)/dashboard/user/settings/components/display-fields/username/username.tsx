'use client';

import { useSession } from 'next-auth/react';

import { useGtwSession } from '@/context/gtw-session-provider';
import useDebouncedUsernameAvaibility from '@/hooks/use-debounced-username-avaibility';
import { common } from '@/locale/en/common';
import { usernameSchema } from '@/schemas/username';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import {
  Button,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';

import { updateUsernameSchema } from './schema';

export default function Username() {
  const { data: session, update } = useSession();

  const initialUsername = session!.user.gatewayId!;

  const { avaibility, onCheckAvaibility, onResetAvaibility } =
    useDebouncedUsernameAvaibility();

  const { mutateAsync } = useMutation({
    mutationKey: ['updateUsername'],
    mutationFn: async (username: string) => {},
  });

  const { enqueueSnackbar } = useSnackbar();

  const { register, control, watch, reset, handleSubmit, formState, setValue } =
    useForm({
      resolver: zodResolver(updateUsernameSchema),
      values: {
        username: initialUsername,
      },
    });

  const username = watch('username');

  const onCancel = () => {
    reset();
    setValue('username', initialUsername);
  };

  const onSubmit = async (data: { username: string }) => {
    try {
      await mutateAsync(data.username);
      await update();
      reset();
    } catch {
      enqueueSnackbar('Failed to update display name', { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {session ? (
        <TextField
          id="username"
          label={common.general.username}
          helperText=" You can edit it once a month"
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          }}
          {...register('username', {
            onChange(event) {
              const value = event.target.value;
              if (value === initialUsername) {
                reset();
                return onResetAvaibility();
              }

              const { success } = usernameSchema.safeParse(value);
              if (success) {
                return onCheckAvaibility(value);
              }
              if (avaibility !== 'idle') {
                onResetAvaibility();
              }
            },
          })}
        />
      ) : (
        <Skeleton
          height={56}
          variant="rounded"
          sx={{
            maxWidth: 478,
            width: '100%',
            m: '0 !important',
          }}
        />
      )}
      {username !== session?.user.gatewayId &&
        session?.user.gatewayId !== null && (
          <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2 }}>
            <Button variant="contained" type="submit">
              {common.actions.save}
            </Button>
            <Button variant="outlined" type="button" onClick={onCancel}>
              {common.actions.cancel}
            </Button>
          </Stack>
        )}
    </form>
  );
}