import Immutable from 'immutable';
import { createSelector } from 'reselect';
import * as site from '../../constants/site';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const modelSelector = state => state.twitter;

const padNum = (num) => {
  return num < 10 ? `0${num}` : num.toString();
};

const composeTweet = (datum) => {
  const date = new Date(datum.get('created_at') * 1000);
  const month = monthLabels[date.getUTCMonth()];
  const year = date.getUTCFullYear().toString().slice(2);
  const dateString = `${padNum(date.getUTCDate())} ${month} ${year}`;
  const textParts = datum.get('text').split(' ');
  const url = textParts.pop();
  const text = textParts.join(' ');
  const media = datum.getIn(['entities', 'media']) || [];
  return Immutable.Map({
    text,
    url,
    time: `Posted ${dateString}`,
    images: media
      .filter(m => m.get('type') === 'photo')
      .map(m => Immutable.Map({
        src: m.get('media_url'),
        width: m.getIn(['sizes', 'small', 'w']),
        height: m.getIn(['sizes', 'small', 'h'])
      }))
  });
};

const composeMdImage = datum => `![${site.name}](${datum.get('src')})`;

const composeTweetMd = (tweet) => {
  const images = tweet.get('images').map(composeMdImage).join('');
  return `
  ${images}
  
  [${tweet.get('time')}](${tweet.get('url')}) - ${tweet.get('text')}
  ---
  `;
};

export const tweetsSelector = createSelector(
  modelSelector,
  (model) => {
    if (!model || !model.get('data')) {
      return null;
    }
    const tweets = model.get('data')
      .filter(datum => datum.get('retweeted') === false)
      .filter(datum => datum.get('in_reply_to_screen_name') === null)
      .map(composeTweet);
    return tweets;
  }
);

export const tweetsMarkdown = createSelector(
  tweetsSelector,
  (tweets) => {
    if (!tweets) {
      return null;
    }
    return tweets.map(composeTweetMd);
  }
);
