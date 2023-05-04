import { prepareSubredditHeading } from "./util";

test('Creates the correct heading from an endpoint', () => {
  expect(prepareSubredditHeading('scifi')).toBe('Sci-Fi');
  expect(prepareSubredditHeading('science')).toBe('Science');
  expect(prepareSubredditHeading('space')).toBe('Space');
  expect(prepareSubredditHeading('')).toBe('Subreddit Feed');
  expect(prepareSubredditHeading()).toBe('Subreddit Feed');
  expect(prepareSubredditHeading(5)).toBe('Subreddit Feed');
  expect(prepareSubredditHeading({})).toBe('Subreddit Feed');
  expect(prepareSubredditHeading([])).toBe('Subreddit Feed');
});