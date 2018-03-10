import 'whatwg-fetch';
import tweetsJson from '../../../mock/data/tweets.json';

export const actionTypes = {
  LOAD_TWEETS_PENDING: 'LOAD_TWEETS_PENDING',
  LOAD_TWEETS_SUCCESS: 'LOAD_TWEETS_SUCCESS',
  LOAD_TWEETS_ERROR: 'LOAD_TWEETS_ERROR'
};

const isDebugMode = false;

export function loadTweets(dispatch) {
  dispatch({
    type: actionTypes.LOAD_TWEETS_PENDING
  });

  if (isDebugMode) {
    setTimeout(() => {
      dispatch({
        type: actionTypes.LOAD_TWEETS_SUCCESS,
        payload: tweetsJson
      });
    }, 300);
    return null;
  }

  const userId = 'thirkettle';

  return fetch(`http://server.willthirkettle.co.uk/api/tweets.php?count=20&user=${userId}`, {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }, (error) => {
    console.log(error);
  }).then((payload) => {
    dispatch({
      type: actionTypes.LOAD_TWEETS_SUCCESS,
      payload
    });
  });
}
