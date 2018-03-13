// import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const modelSelector = state => state.input;

export const keysDownSelector = createSelector(
  modelSelector,
  model => model.get('keysDown')
);

export const keysDownCharsSelector = createSelector(
  keysDownSelector,
  keysDown => Object.values(keysDown.toJS())
);
