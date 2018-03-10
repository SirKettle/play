
import { actionTypes as routerActions } from 'redux-router5';
import { actionTypes as uiActions } from '../../domains/ui/uiActions';
import track from '../../utils/analytics';

const analyticsMiddleware = () => next => (action) => {
  if (action.type === routerActions.TRANSITION_SUCCESS) {
    track.page(action.payload.route.path);
  }
  if (action.type === uiActions.TRACK_EVENT) {
    const { type, key, data } = action.payload;
    track.event(type, key, data);
  }
  return next(action);
};

export default analyticsMiddleware;
