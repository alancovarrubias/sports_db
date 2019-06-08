import { combineReducers } from 'redux';
import {
  RECEIVE_NBA_SEASONS,
  SELECT_NBA_SEASON,
  SELECT_SEASON,
  SELECT_PERIOD,
  TOGGLE_SPORT,
  CHANGE_RANGE,
} from '../actions';

const seasons = (state = { order: [] }, action) => {
  switch (action.type) {
    case RECEIVE_NBA_SEASONS:
      return action.seasons;
    default:
      return state;
  }
}

const selectedSeason = (state = null, action) => {
  switch (action.type) {
    case SELECT_NBA_SEASON:
      return action.selectedSeason;
    default:
      return state;
  }
}

/*
const games = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_NBA_GAMES:
      return action.games;
    default:
      return state;
  }
}
*/

const period = (state = 0, action) => {
  switch (action.type) {
    case SELECT_PERIOD:
      return action.period;
    default:
      return state;
  }
}

const range = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_RANGE:
      return action.range;
    default:
      return state;
  }
}

const nbaReducer = combineReducers({
  seasons,
  selectedSeason,
  period,
});

export default nbaReducer;
