import { PayloadRepository } from '@actions/github/lib/interfaces';
import outdent from 'outdent';

export function getRepoData(repo: PayloadRepository | undefined): any {
  if (repo) {
    const owner: string = repo.owner.login;
    const name: string = repo.name;

    return { owner, name };
  } else {
    throw new Error("Repository data was not found in event payload.");
  }
}
export function getIssueData(issue: any): any {
  if (issue) {
    const number: number = issue.number;
    return { number };
  } else {
    throw new Error("Issue data was not found in event payload.");
  }
}
export function createIssueComment(message: string, status: string, mentions: Array<string> = []): string {
  const statusIcon: string = status === 'failed' ? ':X:' : ':white_check_mark:'
  let mentionsText: string = '';

  for (let mention of mentions) {
    mentionsText += `@${mention} `;
  }

  const body: string = outdent`## Outcome

  ${statusIcon} ${message}

  CC: ${mentionsText}
  `;

  return body;
}

