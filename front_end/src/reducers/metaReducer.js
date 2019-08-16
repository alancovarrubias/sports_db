import { combineReducers } from 'redux'
import { SELECT_SEASON } from '../actions'

const season = (state = {}, action) => {
  switch (action.type) {
    case SELECT_SEASON:
      return action.season
    default:
      return state
  }
}

export default combineReducers({
  season,
})

