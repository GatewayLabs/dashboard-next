import { auth } from '@/locale/en/auth';

import { Stack, Typography } from '@mui/material';

import { AuthenticationOptions } from '../components/authentication-options';
import { LoginEmail } from '../components/login-email';
import { TitleSubtitleField } from '../components/title-field';

export function AuthenticationInitial() {
  return (
    <Stack gap={2} direction={'column'}>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {auth.steps.initial.title}
      </Typography>
      <TitleSubtitleField
        title={auth.steps.initial.title_email}
        subtitle={auth.steps.initial.caption_email}
      />
      <LoginEmail />
      <AuthenticationOptions />
    </Stack>
  );
}