import * as core from '@actions/core';
import * as github from '@actions/github';
import { WebhookPayload } from '@actions/github/lib/interfaces';

async function run(): Promise<void> {
  try {
    const body: string = core.getInput('message');
    const githubToken: string = process.env.GITHUB_TOKEN || '';

    if(githubToken) {
      const octokit: github.GitHub = new github.GitHub(githubToken);

      const payload: WebhookPayload = github.context.payload;
      const issue = payload.issue;
      const repository = payload.repository;

      let owner: string;
      let repo: string;

      if(repository) {
        owner = repository.owner.login,
        repo = repository.name
      } else {
        throw new Error("Repository data was not found in event payload.");
      }
      if(issue) {
        const number:number = issue.number;
        await octokit.issues.createComment({
          body,
          number,
          owner,
          repo
        });
      } else {
        throw new Error("Issue data was not found in event payload.")
      }
    } else {
      throw new Error('GitHub token was not found in environment.')
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
