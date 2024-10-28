import { usePathname, useRouter } from 'next/navigation';

import { Endpoints } from '@octokit/types';
import { useQuery } from '@tanstack/react-query';
import { FaGithub } from 'react-icons/fa';

import { Avatar, Button, Stack, Typography } from '@mui/material';

type GitHubUser = Endpoints['GET /user']['response']['data'];

type Props = {
  token: string;
  remove: () => void;
};

export default function User({ remove, token }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useQuery<GitHubUser>({
    queryKey: ['github-user', token],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    },
  });

  const onRemove = () => {
    router.replace(pathname);
    remove();
  };

  const avatar = data?.avatar_url;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack direction="row" gap={2} justifyContent="space-between">
      <Stack direction="row" gap={2} alignItems="center">
        <Avatar
          src={avatar}
          alt={data?.login}
          sx={{ width: 40, height: 40, backgroundColor: 'black' }}
        >
          {!avatar && <FaGithub color="white" />}
        </Avatar>
        <Stack direction="column" gap={0.5}>
          <Typography sx={{ lineHeight: 1 }}>{data?.name}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1 }}
          >
            {data?.login}
          </Typography>
        </Stack>
      </Stack>
      <Button onClick={onRemove}>Remove</Button>
    </Stack>
  );
}
