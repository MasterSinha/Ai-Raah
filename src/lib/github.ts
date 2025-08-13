import { Octokit } from "octokit";

// Define the shape of the commit data we want to return
export type CommitDetails = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: Date;
};

/**
 * Fetches the latest 10 commits for a given GitHub repository.
 * @param githubUrl The URL of the GitHub repository.
 * @param githubToken An optional GitHub token for authentication.
 * @returns A promise that resolves to an array of processed commit objects.
 */
export const getCommitsWithDetails = async (
  githubUrl: string,
  githubToken?: string,
): Promise<CommitDetails[]> => {
  const octokit = new Octokit({ auth: githubToken || process.env.GITHUB_PERSONAL_ACCESS_TOKEN });
  
  const [owner, repo] = githubUrl.split("/").slice(3, 5);
  
  // Fetch only the latest 10 commits to be more efficient
  const { data } = await octokit.request(`GET /repos/${owner}/${repo}/commits?per_page=10`);

  return data.map((commit: any) => ({
    commitHash: commit.sha,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit?.author?.name ?? "",
    commitAuthorAvatar: commit.author?.avatar_url ?? null,
    commitDate: new Date(commit.commit?.author?.date),
  }));
};