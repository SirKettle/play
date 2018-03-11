import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import twitter from '../domains/twitter/twitterReducer';
import game from '../domains/game/gameReducer';
import drops from '../domains/drops/dropsReducer';
import config from '../domains/config/configReducer';

const rootReducer = combineReducers({
  router: router5Reducer,
  twitter,
  game,
  drops,
  config
});

export default rootReducer;
