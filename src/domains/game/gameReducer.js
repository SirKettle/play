import Immutable from 'immutable';
import { actionTypes } from './gameActions';

const reducers = {
  [actionTypes.REQUEST_GAME_RESET]: (state) => {
    const timeNow = Date.now();
    return state.set('active', false)
      .set('clock', {
        initialTimestamp: timeNow,
        timestamp: timeNow,
        gameTimeMs: 0,
        gameTimeMsElapsed: 0,
        frameIndex: 0,
        delta: 0
      });
  },
  [actionTypes.REQUEST_GAME_TOGGLE_PAUSE]: (state) => {
    return state.update('active', isActive => !isActive);
  },
  [actionTypes.REQUEST_GAME_UDATE]: (state, action) => {
    const timeNow = Date.now();
    const isActive = state.get('active');
    const delta = action.payload.delta;
    return state.update('clock', (clock) => {
      const updatedClock = {
        ...clock,
        timestamp: timeNow,
        gameTimeMs: timeNow - clock.initialTimestamp,
        delta
      };
      if (isActive) {
        updatedClock.frameIndex = clock.frameIndex + 1;
        updatedClock.gameTimeMsElapsed = clock.gameTimeMsElapsed + delta;
      }
      return updatedClock;
    });
  }
};

const initialState = Immutable.Map({
  active: false,
  clock: {}
});

export default function reducer(state = initialState, action) {
  const handler = reducers[action.type];
  return handler ? handler(state, action) : state;
}
