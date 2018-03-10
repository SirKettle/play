import Immutable from 'immutable';
import { actionTypes } from './twitterActions';
import loadingStates from '../../constants/loadingStates';

const reducers = {
  [actionTypes.LOAD_TWEETS_PENDING]: (state) => {
    return state.set('loadingState', loadingStates.LOADING);
  },
  [actionTypes.LOAD_TWEETS_SUCCESS]: (state, action) => {
    return state.set('data', Immutable.fromJS(action.payload)).set('loadingState', loadingStates.COMPLETE);
  }
};

const initialState = Immutable.Map({
  data: null,
  loadingState: loadingStates.NOT_STARTED
});

export default function reducer(state = initialState, action) {
  const handler = reducers[action.type];
  return handler ? handler(state, action) : state;
}
