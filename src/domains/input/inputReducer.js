import Immutable from 'immutable';
import { actionTypes } from './inputActions';

const reducers = {
  [actionTypes.REQUEST_KEY_DOWN]: (state, action) => {
    const { keyCode, key } = action.payload;
    return state.setIn(['keysDown', keyCode], key || keyCode);
  },
  [actionTypes.REQUEST_KEY_UP]: (state, action) => {
    const { keyCode } = action.payload;
    return state.removeIn(['keysDown', keyCode]);
  },
  [actionTypes.REQUEST_BLUR]: (state) => {
    return state.setIn(['keysDown', Immutable.Map({})]);
  }
};

const initialState = Immutable.Map({
  keysDown: Immutable.Map({})
});

export default function reducer(state = initialState, action) {
  const handler = reducers[action.type];
  return handler ? handler(state, action) : state;
}
