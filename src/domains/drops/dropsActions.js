
export const actionTypes = {
  REQUEST_DROPS_RESET: 'REQUEST_DROPS_RESET',
  REQUEST_DROPS_ADD: 'REQUEST_DROPS_ADD'
};

export function resetDrops(dispatch) {
  dispatch({
    type: actionTypes.REQUEST_DROPS_RESET
  });
}

export function addDrop(dispatch) {
  dispatch({
    type: actionTypes.REQUEST_DROPS_ADD
  });
}
