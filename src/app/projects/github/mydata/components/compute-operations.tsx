import { Card, Divider, Stack, Typography } from '@mui/material';
import ComputeOperationsItem from './compute-operations-item';

export default function ComputeOperations() {
  return (
    <Stack
      component={Card}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant="subtitle1" p={3}>
        What will be computed
      </Typography>
      <Stack direction="column" gap={2} divider={<Divider />} mb={3}>
        <ComputeOperationsItem
          label="Most used language"
          description="Show number of devs who have more than 60% of their code in each language"
        />
        <ComputeOperationsItem
          label="More popular repositories"
          description="Compare the number of stars above 20 to identify which projects are more popular"
        />
        <ComputeOperationsItem
          label="Less popular repositories"
          description="Compare the number of stars less than 2 to identify which projects are less popular"
        />
        <ComputeOperationsItem
          label="Famous profiles"
          description="Show number of profiles that have more than 1000 followers"
        />
        <ComputeOperationsItem label="Sum of all pull requests" />
        <ComputeOperationsItem label="Sum of all commits" />
        <ComputeOperationsItem label="Sum of all issues" />
      </Stack>
    </Stack>
  );
}
