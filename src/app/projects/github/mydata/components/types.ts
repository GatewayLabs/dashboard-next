export const percentageLanguageCount = {
  percentageOfRepoInJavaScript: 0,
  percentageOfRepoInPython: 0,
  percentageOfRepoInJava: 0,
  percentageOfRepoInTypeScript: 0,
  percentageOfRepoInCSharp: 0,
  percentageOfRepoInCPP: 0,
  percentageOfRepoInPHP: 0,
  percentageOfRepoInShell: 0,
  percentageOfRepoInC: 0,
  percentageOfRepoInRuby: 0,
};
export type PercentageLanguageCount = typeof percentageLanguageCount;
export type PercentageLanguageKey = keyof PercentageLanguageCount;
export const repoLanguages = Object.keys(
  percentageLanguageCount
) as PercentageLanguageKey[];

export const languages = [
  'JavaScript',
  'Python',
  'Java',
  'TypeScript',
  'C#',
  'C++',
  'PHP',
  'Shell',
  'C',
  'Ruby',
] as const;

export interface GitHubData extends PercentageLanguageCount {
  totalPullRequests: number;
  totalCommits: number;
  totalIssues: number;
}
