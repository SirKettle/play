// import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const modelSelector = state => state.game;

export const isActiveSelector = createSelector(
  modelSelector,
  model => model.get('active')
);

export const clockSelector = createSelector(
  modelSelector,
  model => model.get('clock')
);

export const frameIndexSelector = createSelector(
  clockSelector,
  clock => clock.frameIndex || -1
);
