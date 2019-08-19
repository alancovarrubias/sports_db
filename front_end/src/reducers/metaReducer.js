import { combineReducers } from 'redux'
import {
  CHOOSE_SEASON,
  SEASONS_FETCH,
  GAMES_FETCH,
} from '../actions'

const season = (state = null, action) => {
  const { payload, type } = action
  switch (type) {
    case CHOOSE_SEASON:
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
      console.log(action)
      return [payload, ...state]
    default:
      return state
  }
}

export default combineReducers({
  season,
  seasonsFetch,
  gamesFetch,
})

