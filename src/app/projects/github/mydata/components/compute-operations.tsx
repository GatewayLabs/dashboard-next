import { Card, Divider, Stack, Typography } from '@mui/material';

import ComputeOperationsItem from './compute-operations-item';

type Props = {
  data: boolean;
};

export default function ComputeOperations({ data }: Props) {
  return (
    <Stack
      component={Card}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
      }}
    >
      <Typography variant="subtitle1" p={3}>
        What will be computed
      </Typography>
      <Stack
        direction="column"
        gap={2}
        divider={<Divider />}
        mb={3}
        sx={{ width: '100%' }}
      >
        <ComputeOperationsItem
          label="Most used language"
          description="Show number of devs who have more than 60% of their code in each language"
          value={data ? 5 : undefined}
        />
        <ComputeOperationsItem
          label="More popular repositories"
          description="Compare the number of stars above 20 to identify which projects are more popular"
          value={data ? 5 : undefined}
        />
        <ComputeOperationsItem
          label="Less popular repositories"
          description="Compare the number of stars less than 2 to identify which projects are less popular"
          value={data ? 5 : undefined}
        />
        <ComputeOperationsItem
          label="Famous profiles"
          description="Show number of profiles that have more than 1000 followers"
          value={data ? 5 : undefined}
        />
        <ComputeOperationsItem
          label="Sum of all pull requests"
          value={data ? 40 : undefined}
        />
        <ComputeOperationsItem
          label="Sum of all commits"
          value={data ? 40 : undefined}
        />
        <ComputeOperationsItem
          label="Sum of all issues"
          value={data ? 40 : undefined}
        />
      </Stack>
    </Stack>
  );
}
