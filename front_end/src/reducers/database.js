import { combineReducers } from 'redux';
import {
  RECEIVE_SEASONS,
  RECEIVE_GAMES,
  RECEIVE_GAME,
  SELECT_SEASON,
  SELECT_PERIOD,
  // TOGGLE_SPORT,
  // CHANGE_RANGE,
} from '../actions';

const seasons = (state = { order: [] }, action) => {
  switch (action.type) {
    case RECEIVE_SEASONS:
      return action.seasons;
    default:
      return state;
  }
}

const season = (state = {}, action) => {
  switch (action.type) {
    case SELECT_SEASON:
      return action.season;
    default:
      return state;
  }
}

const games = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_GAMES:
      return action.games;
    default:
      return state;
  }
}

const period = (state = 0, action) => {
  switch (action.type) {
    case SELECT_PERIOD:
      return action.period;
    default:
      return state;
  }
}

const game = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_GAME:
      return action.game;
    default:
      return state;
  }
}


/*
const range = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_RANGE:
      return action.range;
    default:
      return state;
  }
}
*/

const databaseReducer = combineReducers({
  seasons,
  games,
  season,
  game,
  period,
});

export default databaseReducer;
