import * as core from '@actions/core';
import * as github from '@actions/github';
import {WebhookPayload} from '@actions/github/lib/interfaces';
import {getRepoData, getIssueData, createIssueComment} from './utils';

async function run(): Promise<void> {
  try {
    const message: string = core.getInput('message');
      const status: string = core.getInput('stepStatus');
      const label: string = core.getInput('label');
    const githubToken: string = process.env.GITHUB_TOKEN || '';

    if (githubToken) {
      const octokit: github.GitHub = new github.GitHub(githubToken);

      const payload: WebhookPayload = github.context.payload;
      const issue = payload.issue;
      const repository = payload.repository;
      const {owner, name: repo} = getRepoData(repository);
      const {number} = getIssueData(issue);
      const body = createIssueComment(message, status);

      await octokit.issues.createComment({
        body,
        /* eslint-disable-next-line */
        issue_number: number,
        owner,
        repo
      });

        if(label){
            await octokit.issues.addLabels({
                owner,
                repo,
                /* eslint-disable-next-line */
                issue_number: number,
                labels: [
                    `${label}`
                ]
            });
        }
    } else {
      throw new Error('GitHub token was not found in environment.');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (!module.parent) {
  run();
}

export {run};
