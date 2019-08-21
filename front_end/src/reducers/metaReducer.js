import { combineReducers } from 'redux'
import {
  CHOOSE_SEASON,
  CHOOSE_GAME,
  SEASONS_FETCH,
  GAMES_FETCH,
  GAME_FETCH,
} from '../actions'

const seasonId = (state = null, action) => {
  const { payload, type } = action
  switch (type) {
    case CHOOSE_SEASON:
      return payload
    default:
      return state
  }
}

const gameId = (state = null, action) => {
  const { payload, type } = action
  switch (type) {
    case CHOOSE_GAME:
      return payload
    default:
      return state
  }
}

const seasonsFetch = (state = false, action) => {
  const { payload, type } = action
  switch (type) {
    case SEASONS_FETCH:
      return payload
    default:
      return state
  }
}

const gamesFetch = (state = [], action) => {
  const { payload, type } = action
  switch (type) {
    case GAMES_FETCH:
      return [payload, ...state]
    default:
      return state
  }
}

const gameFetch = (state = [], action) => {
  const { payload, type } = action
  switch (type) {
    case GAME_FETCH:
      return [payload, ...state]
    default:
      return state
  }
}

export default combineReducers({
  seasonId,
  gameId,
  seasonsFetch,
  gamesFetch,
  gameFetch,
})

