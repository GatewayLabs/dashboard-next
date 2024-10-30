import { Card, Divider, Stack, Typography } from '@mui/material';

import ComputeOperationsItem from './compute-operations-item';
import { repoLanguages } from './types';

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
        <Stack direction="column">
          <ComputeOperationsItem
            label="Most used language"
            description="Show number of devs who have more than 60% of their code in each language"
          />
          {repoLanguages.map((language) => (
            <Stack
              key={language}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="bold">
                {language}
              </Typography>
              <Typography>40</Typography>
            </Stack>
          ))}
        </Stack>
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
