export function prepareSubredditHeading(str) {
  if (typeof str !== 'string' || !str.length) {
    return 'Subreddit Feed';
  }

  return str === 'scifi' 
                  ? 'Sci-Fi' 
                  : str.slice(0,1).toUpperCase() + str.slice(1);
};