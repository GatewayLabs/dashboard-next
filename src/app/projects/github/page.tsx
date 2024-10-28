import LoginButton from './components/auth/login-button';
import GithubLayout from './components/github-layout';

export default function GithubProject() {
  return (
    <GithubLayout>
      <>
        <h1>GitHub Project</h1>
        <p>GitHub project content</p>
        <LoginButton />
      </>
    </GithubLayout>
  );
}
