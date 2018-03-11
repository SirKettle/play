import Immutable from 'immutable';
import { actionTypes } from './dropsActions';
import { actionTypes as gameActionTypes } from '../game/gameActions';
// import { probDo } from '../../utils/game';

const composeRainDrop = () => ({
  x: Math.random(),
  y: Math.random(),
  size: Math.floor((Math.random() * 20) + 5),
  lifeTime: (Math.random() * 6000) + 2000,
  bornTimestamp: Date.now()
});

const reducers = {
  [actionTypes.REQUEST_DROPS_RESET]: (state) => {
    return state.set('drops', []);
  },
  [actionTypes.REQUEST_DROPS_ADD]: (state) => {
    return state.update('drops', (drops) => {
      drops.push(composeRainDrop());
      return drops;
    });
  },
  [gameActionTypes.REQUEST_GAME_UDATE]: (state) => {
    const timeNow = Date.now();
    return state.update('drops', (drops) => {
      return drops.map(drop => ({
        ...drop,
        lifeTime: drop.lifeTime - (timeNow - drop.bornTimestamp),
        size: drop.size - 0.1
      })).filter((drop) => {
        return drop.size > 1 && drop.lifeTime > 0;
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
