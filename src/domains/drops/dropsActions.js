
export const actionTypes = {
  REQUEST_DROPS_RESET: 'REQUEST_DROPS_RESET',
  REQUEST_DROPS_ADD: 'REQUEST_DROPS_ADD'
};

export const resetDrops = () => (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_DROPS_RESET
  });
};

export const addDrop = payload => (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_DROPS_ADD,
    payload
  });
};
