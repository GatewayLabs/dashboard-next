import { Metadata } from 'next';

import InternalHeader from '@/components/internal/internal-header';

import { Box, Button, Typography } from '@mui/material';

import DataModelsList from './components/list';

export const metadata: Metadata = {
  title: 'Data Models',
};

export default function DataModelHomePage() {
  return (
    <>
      <InternalHeader
        color="primary"
        slot={
          <>
            <Typography
              variant="body1"
              mt={2}
              color="text.secondary"
              width={{ xs: '100%', md: '50%' }}
              gutterBottom
            >
              Structured data assets are arranged in Data Models. Each data
              uploaded using a data model adheres to a standardized structure,
              making these frameworks exceptionally reusable for various related
              scenarios.
            </Typography>

            <Box>
              <Button
                variant="text"
                color="primary"
                size="small"
                sx={{ px: 0 }}
              >
                How to use data models
              </Button>
            </Box>
          </>
        }
      >
        Data models
      </InternalHeader>
      <DataModelsList />
    </>
  );
}
