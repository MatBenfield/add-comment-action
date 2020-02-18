/* global octomock */
import {run} from '../src/main';

beforeAll(() => {
  process.env.GITHUB_TOKEN = 'not-a-token';
  let context = octomock.getContext();
  context.payload = {
    repository: {
      name: 'loth-cat-pen-monitor',
      owner: {
        login: 'ezra'
      }
    },
    issue: {
      number: 1
    }
  };
  octomock.updateContext(context);
});
test('Main', async () => {
  await run();
  expect(octomock.mockFunctions.getInput).toHaveBeenCalledTimes(3);
  expect(octomock.mockFunctions.createComment).toHaveBeenCalled();
});
