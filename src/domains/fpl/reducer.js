import Immutable from 'immutable';
import { actionTypes } from './actions';
import loadingStates from '../../constants/loadingStates';

const reducers = {
  [actionTypes.LOAD_FPL_DETAILS_PENDING]: (state) => {
    return state.set('loadingState', loadingStates.LOADING);
  },
  [actionTypes.LOAD_FPL_DETAILS_SUCCESS]: (state, action) => {
    return state.set('data', action.payload).set('loadingState', loadingStates.COMPLETE);
  }
};

const initialState = Immutable.Map({
  data: {
    league: {},
    league_entries: [],
    matches: [],
    standings: []
  },
  loadingState: loadingStates.NOT_STARTED
});

export default function reducer(state = initialState, action) {
  const handler = reducers[action.type];
  return handler ? handler(state, action) : state;
}
