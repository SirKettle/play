import Immutable from 'immutable';
import { actionTypes, SERVICES } from './configActions';
import loadingStates from '../../constants/loadingStates';

const setPending = (state, service) => {
  return state.setIn([service, 'loadingStatus'], loadingStates.LOADING);
};

const setError = (state, service) => {
  return state.setIn([service, 'loadingStatus'], loadingStates.ERROR);
};

const setSuccess = (state, service, data) => {
  return state.setIn([service, 'loadingStatus'], loadingStates.COMPLETE)
    .setIn([service, 'data'], data);
};

const reducers = {};

Object.keys(SERVICES).forEach((service) => {
  reducers[actionTypes[`REQUEST_${service}_PENDING`]] = (state) => {
    return setPending(state, service);
  };
  reducers[actionTypes[`REQUEST_${service}_ERROR`]] = (state) => {
    return setError(state, service);
  };
  reducers[actionTypes[`REQUEST_${service}_SUCCESS`]] = (state, action) => {
    return setSuccess(state, service, Immutable.fromJS(action.payload));
  };
});

const initialState = Immutable.fromJS({});

export const reducer = (state = initialState, action) => {
  const handler = reducers[action.type];
  return handler ? handler(state, action) : state;
};

export default reducer;
