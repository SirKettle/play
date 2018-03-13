import { pick } from 'ramda';

export const actionTypes = {
  REQUEST_KEY_DOWN: 'REQUEST_KEY_DOWN',
  REQUEST_KEY_UP: 'REQUEST_KEY_UP',
  REQUEST_BLUR: 'REQUEST_BLUR'
};

export const onKeyDown = event => (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_KEY_DOWN,
    payload: pick(['keyCode', 'key'], event)
  });
};

export const onKeyUp = event => (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_KEY_UP,
    payload: pick(['keyCode', 'key'], event)
  });
};

export const onBlur = () => (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_BLUR
  });
};
