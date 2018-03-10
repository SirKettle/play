import 'whatwg-fetch';

export const actionTypes = {
  TRACK_EVENT: 'TRACK_EVENT'
};

export const trackEvent = (dispatch, type, key, data) => {
  dispatch({
    type: actionTypes.TRACK_EVENT,
    payload: {
      type,
      key,
      data
    }
  });
};

export const trackClick = (dispatch, key, data) => {
  return trackEvent(dispatch, 'click', key, data);
};
