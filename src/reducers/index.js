import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import twitter from '../domains/twitter/twitterReducer';
import config from '../domains/config/configReducer';

const rootReducer = combineReducers({
  router: router5Reducer,
  twitter,
  config
});

export default rootReducer;
