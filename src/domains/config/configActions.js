import 'whatwg-fetch';

export const SERVICES = {
  IP_INFO: 'IP_INFO'
};

const FETCH_STATES = ['PENDING', 'SUCCESS', 'ERROR'];

export const actionTypes = {};
// Extend actionTypes dynamically based on SERVICES and FETCH_STATES
Object.keys(SERVICES).forEach((service) => {
  FETCH_STATES.forEach((fetchStatus) => {
    const actionType = `REQUEST_${service}_${fetchStatus}`;
    actionTypes[actionType] = actionType;
  });
});

const ENDPOINTS = {
  IP_INFO: 'https://ipinfo.io/json'
};

export const requestIpInfo = (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_IP_INFO_PENDING
  });
  return fetch(ENDPOINTS.IP_INFO, {
    method: 'GET'
  })
  .then(response => response.json()
  .then((payload) => {
    dispatch({
      type: actionTypes.REQUEST_IP_INFO_SUCCESS,
      payload
    });
  }), (error) => {
    dispatch({
      type: actionTypes.REQUEST_IP_INFO_ERROR,
      payload: {
        error
      }
    });
  });
};
