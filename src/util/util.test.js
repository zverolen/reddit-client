import { prepareSubredditHeading } from "./util";
import { formatDate } from "./util";

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

// 1684434487
//new Intl.DateTimeFormat()
test('Formats the date correctly', () => {  
  expect(formatDate(1681314752)).toEqual('Jan, 20 1970');
  expect(formatDate('1681314752')).toEqual('Date unknown');
})