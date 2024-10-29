import { Stack } from '@mui/system';

import GithubLayout from './components/github-layout';
import TextData from './components/text-data';

export default function GithubProject() {
  return (
    <GithubLayout>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={4} mb={4}>
        <TextData
          title="What is that?"
          description="This is a showcase demonstrating how the Gateway Encrypted Compute works using publicly available GitHub data as an example. When you connect your GitHub account, the system retrieves various metrics like contributions, repository activity, and programming language diversity to illustrate how we process real-world data securely. All computations happen with privacy in mind, ensuring your data is protected during every step of the process."
        />
        <TextData
          title="Built on the Gateway Protocol"
          description="The system you’re exploring is built using the Gateway Protocol, a cutting-edge protocol to encrypt, store, manage, and compute private data. By incorporating Garbled Circuits, the Gateway Protocol allows us to create secure environments where data can be used meaningfully without ever revealing its true contents."
        />
      </Stack>
    </GithubLayout>
  );
}
