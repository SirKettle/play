import Immutable from 'immutable';
import { actionTypes } from './dropsActions';
import { actionTypes as gameActionTypes } from '../game/gameActions';
// import { probDo } from '../../utils/game';

const composeRainDrop = (x, y, lifeForce) => {
  const lifeSpan = (Math.random() * 1000) + 100;
  // const lifeSpan = 2000;
  return {
    x: typeof x === 'number' ? x : Math.random(),
    y: typeof y === 'number' ? y : Math.random(),
    size: 0, // Math.floor((Math.random() * 20) + 5),
    // lifeSpan: (Math.random() * 6000) + 2000,
    lifeSpan,
    lifeLeft: lifeForce || lifeSpan
  };
};

const reducers = {
  [actionTypes.REQUEST_DROPS_RESET]: (state) => {
    return state.set('drops', []);
  },
  [actionTypes.REQUEST_DROPS_ADD]: (state, action) => {
    const { x, y, lifeForce } = action.payload;
    return state.update('drops', (drops) => {
      drops.push(composeRainDrop(x, y, lifeForce));
      return drops;
    });
  },
  [gameActionTypes.REQUEST_GAME_UDATE]: (state, action) => {
    const { delta, isActive } = action.payload;
    if (!isActive) {
      return state;
    }
    return state.update('drops', (drops) => {
      return drops.map(drop => ({
        ...drop,
        lifeLeft: Math.max(0, drop.lifeLeft - delta),
        size: drop.size + 2.5
      }))
      .filter((drop) => {
        return drop.lifeLeft > 0;
        // return !!drop;
      });
    });
  }
};

const initialState = Immutable.Map({
  drops: []
});

export default function reducer(state = initialState, action) {
  const handler = reducers[action.type];
  return handler ? handler(state, action) : state;
}
