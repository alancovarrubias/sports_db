import { combineReducers } from 'redux'
import {
  RECEIVE_SEASONS,
  RECEIVE_GAMES,
} from '../actions'

const seasons = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SEASONS:
      return { ...state, ...action.seasons }
    default:
      return state
  }
}

const games = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_GAMES:
      return { ...state, ...action.games }
    default:
      return state
  }
}

/*
const period = (state = 0, action) => {
  switch (action.type) {
    case SELECT_PERIOD:
      return action.period
    default:
      return state
  }
}

const game = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_GAME:
      return action.game
    default:
      return state
  }
}


const range = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_RANGE:
      return action.range
    default:
      return state
  }
}
*/

const entitiesReducer = combineReducers({
  seasons,
  games,
})

export default entitiesReducer
