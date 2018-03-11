// import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const modelSelector = state => state.drops;

export const dropsSelector = createSelector(
  modelSelector,
  model => model.get('drops')
);
