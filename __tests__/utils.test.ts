import outdent from 'outdent';
import {getRepoData, getIssueData, createIssueComment} from '../src/utils';
import {PayloadRepository} from '@actions/github/lib/interfaces';

test('getRepoData', () => {
  const repoData: PayloadRepository = {
    name: 'loth-cat-pen-monitor',
    owner: {
      login: 'ezra'
    }
  };

  const {owner, name} = getRepoData(repoData);

  expect(owner).toEqual(repoData.owner.login);
  expect(name).toEqual(repoData.name);
});
test('getIssueData', () => {
  const issue = {
    number: 1,
    title: 'Pen doors do not close',
    repo: {
      name: 'loth-cat-pen-monitor',
      owner: {
        login: 'ezra'
      }
    }
  };

  const {number} = getIssueData(issue);

  expect(number).toEqual(issue.number);
});
test('createIssueComment', () => {
  const expected: string = outdent`## Outcome

  :white_check_mark: Red 5 standing by

  CC: @leia @dodana @monmathma `;

  const actual = createIssueComment('Red 5 standing by', 'success', [
    'leia',
    'dodana',
    'monmathma'
  ]);

  expect(actual).toEqual(expected);
});
