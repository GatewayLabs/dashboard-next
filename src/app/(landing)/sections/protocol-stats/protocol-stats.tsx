import { Suspense } from "react";

import { Box, Container, Skeleton, Stack, Typography } from "@mui/material";

import AnimatedCounter from "./animated-counter";

const statProps = {
  justifyContent: "space-between",
  sx: {
    borderRadius: 1,
    backgroundColor: "primary.200",
    gap: 6,
    p: 3,
  },
};

type Props = {
  totalTransactions?: number;
  pdasIssued?: number;
  totalUsers?: number;
  uniqueIssuers?: number;
};

function ProtocolStatsContent({
  totalTransactions,
  pdasIssued,
  totalUsers,
  uniqueIssuers,
}: Props) {
  return (
    <Stack
      component={Container}
      flexDirection={{
        xs: "column",
        lg: "row",
      }}
      sx={{
        pt: {
          xs: 6,
          md: 17.5,
        },
        pb: {
          xs: 6,
          md: 15,
        },
      }}
      gap={3}
    >
      <Box
        sx={{
          width: {
            lg: 316,
          },
          flexShrink: {
            lg: 0,
          },
        }}
      >
        <Typography
          component="h2"
          variant="subtitle1"
          sx={{
            color: "primary.200",
          }}
          fontWeight="lighter"
        >
          Protocol Stats
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h3"
          sx={{
            color: "white.main",
            mb: 6,
            typography: {
              xs: "h5",
              sm: "h4",
              md: "h3",
            },
          }}
        >
          The Decentralized Private Computer is growing a new data economy.
        </Typography>
        <Stack flexDirection={{ xs: "column", md: "row" }} gap={2}>
          <Stack
            {...statProps}
            sx={{
              ...statProps.sx,
              width: "100%",
            }}
          >
            <Typography>Transactions Count</Typography>
            <Typography
              color="primary.main"
              sx={{
                typography: {
                  xs: "h3",
                  md: "h2",
                  lg: "h1",
                },
                fontSize: {
                  lg: "5.125rem",
                },
                gap: {
                  xs: 16,
                  md: 6,
                },
              }}
            >
              {totalTransactions ? (
                <AnimatedCounter from={0} to={totalTransactions} />
              ) : (
                <Skeleton />
              )}
            </Typography>
          </Stack>
          <Stack
            {...statProps}
            sx={{
              ...statProps.sx,
              width: {
                xs: "100%",
                md: "60%",
              },
            }}
          >
            <Typography>Files Stored</Typography>
            <Typography color="primary.main" variant="h5">
              {pdasIssued ? (
                <AnimatedCounter
                  from={0}
                  to={pdasIssued}
                  options={{ duration: 1.5 }}
                />
              ) : (
                <Skeleton />
              )}
            </Typography>
          </Stack>
          <Stack
            gap={2}
            sx={{
              width: {
                xs: "100%",
                md: "45%",
              },
            }}
          >
            <Stack {...statProps}>
              <Typography>Users Empowered</Typography>
              <Typography color="primary.main" variant="h5">
                {totalUsers ? (
                  <AnimatedCounter
                    from={0}
                    to={totalUsers}
                    options={{ duration: 2 }}
                  />
                ) : (
                  <Skeleton />
                )}
              </Typography>
            </Stack>
            <Stack {...statProps}>
              <Typography>Data Contributors</Typography>
              <Typography color="primary.main" variant="h5">
                {uniqueIssuers ? (
                  <AnimatedCounter
                    from={0}
                    to={uniqueIssuers}
                    options={{ duration: 2.5 }}
                  />
                ) : (
                  <Skeleton />
                )}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

async function ProtocolStatsContainer() {
  return <ProtocolStatsContent />;
}

export default function ProtocolStats() {
  return (
    <Suspense fallback={<ProtocolStatsContent />}>
      {<ProtocolStatsContainer />}
    </Suspense>
  );
}
