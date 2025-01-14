'use client';

import CopyButton from '@/components/copy-button/copy-button';
import ToggleVisibilityButton from '@/components/toggle-visibility-button/toggle-visibility-button';
import { useToggle } from '@react-hookz/web';

import { Warning } from '@mui/icons-material';
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

export default function AuthenticationToken({ token }: { token: string }) {
  const [isVisible, toggleVisible] = useToggle(false);

  return (
    <Card sx={{ width: '100%' }} variant="outlined">
      <CardHeader
        title="Authentication Token"
        titleTypographyProps={{
          variant: 'subtitle1',
          fontWeight: 'bold',
        }}
        action={
          <>
            <ToggleVisibilityButton
              isVisible={isVisible}
              onToggle={toggleVisible}
              size="medium"
              sx={{ mr: 1 }}
            />
            <CopyButton text={token} size="medium" />
          </>
        }
      />
      <CardContent>
        <Typography sx={{ mb: 2, wordBreak: 'break-all' }}>
          {isVisible ? token : '••••'}
        </Typography>
        <Alert color="warning" icon={<Warning />}>
          By sharing your authentication token, you assume all responsibility
          for any actions performed using your token, whether authorized or
          unauthorized.
        </Alert>
      </CardContent>
    </Card>
  );
}
