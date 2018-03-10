import { createSelector } from 'reselect';

export const routerSelector = state => state.router;

export const activeRouteSelector = createSelector(
  routerSelector,
  router => router.route
);
