import { Card, Divider, Stack, Typography } from '@mui/material';

import ComputeOperationsItem from './compute-operations-item';
import { languages } from './types';

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
        {data ? 'Results' : 'What will be computed'}
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
          <Stack mt={1}>
            {languages.map((language) => (
              <Stack
                key={language}
                direction="row"
                justifyContent="space-between"
                px={3}
                mt={1}
              >
                <Typography variant="body1">{language}</Typography>
                <Typography fontWeight="bold">
                  {data ? 3 : undefined}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <ComputeOperationsItem
          label="Sum of all pull requests"
          value={data ? 21 : undefined}
        />
        <ComputeOperationsItem
          label="Sum of all commits"
          value={data ? 17 : undefined}
        />
        <ComputeOperationsItem
          label="Sum of all issues"
          value={data ? 40 : undefined}
        />
      </Stack>
    </Stack>
  );
}
