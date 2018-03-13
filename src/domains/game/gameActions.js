import * as gameSelectors from '../game/gameSelectors';

export const actionTypes = {
  REQUEST_GAME_RESET: 'REQUEST_GAME_RESET',
  REQUEST_GAME_TOGGLE_PAUSE: 'REQUEST_GAME_TOGGLE_PAUSE',
  REQUEST_GAME_UDATE: 'REQUEST_GAME_UDATE'
};

export const togglePause = () => (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_GAME_TOGGLE_PAUSE
  });
};

export const resetGameClock = () => (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_GAME_RESET
  });
};

export const updateGameClock = delta => (dispatch, getState) => {
  // console.log(typeof getState);
  dispatch({
    type: actionTypes.REQUEST_GAME_UDATE,
    payload: {
      delta,
      isActive: gameSelectors.isActiveSelector(getState())
    }
  });
};
