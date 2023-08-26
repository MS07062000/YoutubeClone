const moment = require('moment');

export function formatNumber(num, precision = 2) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
}


function calculateTimeDifference(dateTime) {
  const now = moment();
  const targetDateTime = moment(dateTime);
  const yearsAgo = now.diff(targetDateTime, 'years');
  const daysAgo = now.diff(targetDateTime, 'days');
  const hoursAgo = now.diff(targetDateTime, 'hours');
  const minutesAgo = now.diff(targetDateTime, 'minutes');
  const secondsAgo = now.diff(targetDateTime, 'seconds');
  return { yearsAgo, daysAgo, hoursAgo, minutesAgo, secondsAgo };
}


export function getTimeAgoString(dateTime) {
  const { yearsAgo, daysAgo, hoursAgo, minutesAgo, secondsAgo } = calculateTimeDifference(dateTime);

  if (yearsAgo > 0) {
    return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
  } else if (daysAgo > 0) {
    return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutesAgo > 0 ){
    return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `${secondsAgo} ${secondsAgo === 1 ? 'second' : 'seconds'} ago`;
  }
}
