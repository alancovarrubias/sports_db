import { combineReducers } from 'redux'
import {
  RECEIVE_SEASONS,
  RECEIVE_GAMES,
  RECEIVE_GAME,
  SELECT_SEASON,
  SELECT_PERIOD,
  TOGGLE_SPORT,
} from '../actions'
import { NBA } from '../const';

const seasons = (state = [], action) => {
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

const games = (state = {}, action) => {
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

const sport = (state = NBA, action) => {
  switch (action.type) {
    case TOGGLE_SPORT:
      return action.sport;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  sport,
  seasons,
  games,
  season,
  game,
  period,
})

export default rootReducer;
