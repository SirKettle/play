
export const actionTypes = {
  REQUEST_GAME_RESET: 'REQUEST_GAME_RESET',
  REQUEST_GAME_TOGGLE_PAUSE: 'REQUEST_GAME_TOGGLE_PAUSE',
  REQUEST_GAME_UDATE: 'REQUEST_GAME_UDATE'
};

export function resetGameClock(dispatch) {
  dispatch({
    type: actionTypes.REQUEST_GAME_RESET
  });
}

export function togglePause(dispatch) {
  dispatch({
    type: actionTypes.REQUEST_GAME_TOGGLE_PAUSE
  });
}

export function updateGameClock(dispatch) {
  dispatch({
    type: actionTypes.REQUEST_GAME_UDATE
  });
}
