export function prepareSubredditHeading(str) {
  if (typeof str !== 'string' || !str.length) {
    return 'Subreddit Feed';
  }

  return str === 'scifi' 
                  ? 'Sci-Fi' 
                  : str.slice(0,1).toUpperCase() + str.slice(1);
};

export function formatDate(dateUTC) {
  
  if (typeof dateUTC !== 'number') {
    console.log('The date must be a timestamp (UTC)');
    return 'Date unknown';
  }
  
  const date = new Date(dateUTC);
  let preparedMonth = '';

  switch (date.getMonth()) {
    case 0:
      preparedMonth = 'Jan';
      break;
    case 1:
      preparedMonth = 'Feb';
      break;
    case 2:
      preparedMonth = 'Mar';
      break;
    case 3:
      preparedMonth = 'Apr';
      break;
    case 4:
      preparedMonth = 'May';
      break;
    case 5:
      preparedMonth = 'Jun';
      break;
    case 6:
      preparedMonth = 'Jul';
      break;
    case 7:
      preparedMonth = 'Aug';
      break;
    case 8:
      preparedMonth = 'Sep';
      break;
    case 9:
      preparedMonth = 'Oct';
      break;
    case 10:
      preparedMonth = 'Nov';
      break;
    default:
      preparedMonth = 'Dec';
  }

  return `${preparedMonth}, ${date.getDate()} ${date.getFullYear()}`;
}