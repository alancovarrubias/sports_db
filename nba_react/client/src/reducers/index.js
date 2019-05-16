import { combineReducers } from 'redux'
import {
  RECEIVE_SEASONS,
  RECEIVE_GAMES,
  RECEIVE_GAME,
  SELECT_SEASON,
  SELECT_PERIOD
} from '../actions'

function seasons(state = [], action) {
  switch (action.type) {
    case RECEIVE_SEASONS:
      return action.seasons;
    default:
      return state;
  }
}

function season(state = {}, action) {
  switch (action.type) {
    case SELECT_SEASON:
      return action.season;
    default:
      return state;
  }
}

function games(state = {}, action) {
  switch (action.type) {
    case RECEIVE_GAMES:
      return action.games;
    default:
      return state;
  }
}

function period(state = 0, action) {
  switch (action.type) {
    case SELECT_PERIOD:
      return action.period;
    default:
      return state;
  }
}

function game(state = {}, action) {
  switch (action.type) {
    case RECEIVE_GAME:
      return action.game;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  seasons,
  games,
  season,
  game,
  period
})

export default rootReducer
