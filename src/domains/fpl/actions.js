import 'whatwg-fetch';
import { getMockData, OUR_LEAGUE_ID } from '../../../mock/data/fplLeague';

export const actionTypes = {
  LOAD_FPL_DETAILS_PENDING: 'LOAD_FPL_DETAILS_PENDING',
  LOAD_FPL_DETAILS_SUCCESS: 'LOAD_FPL_DETAILS_SUCCESS',
  LOAD_FPL_DETAILS_ERROR: 'LOAD_FPL_DETAILS_ERROR'
};

const isDebugMode = false;

export const corsRequestUrl = url => `http://cors-anywhere.herokuapp.com/${url}`;

export function loadDetails(dispatch, leagueId = OUR_LEAGUE_ID) {
  dispatch({
    type: actionTypes.LOAD_FPL_DETAILS_PENDING
  });

  if (isDebugMode) {
    setTimeout(() => {
      dispatch({
        type: actionTypes.LOAD_FPL_DETAILS_SUCCESS,
        payload: getMockData(leagueId)
      });
    }, 300);
    return null;
  }

  return fetch(corsRequestUrl(`https://draft.premierleague.com/api/league/${leagueId}/details`), {
    method: 'GET'
    // mode: 'no-cors'
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Not ok');
  }, (error) => {
    throw new Error(error);
  }).then((payload) => {
    dispatch({
      type: actionTypes.LOAD_FPL_DETAILS_SUCCESS,
      payload
    });
  });
}
