import { combineReducers } from 'redux'
import { TOGGLE_SPORT } from '../actions'
import { NBA, MLB, DEFAULT_SPORT } from '../const/sports'
import { namespaceReducerFactory } from '../helpers/namespaceModule'

import entitiesReducer from './entities'
import indicesReducer from './indices'

const sport = (state = DEFAULT_SPORT, action) => {
  switch (action.type) {
    case TOGGLE_SPORT:
      return action.sport
    default:
      return state
  }
}

const databaseReducer = combineReducers({
  entities: entitiesReducer,
  indices: indicesReducer,
})

const mlbReducer = namespaceReducerFactory(MLB)(databaseReducer)
const nbaReducer = namespaceReducerFactory(NBA)(databaseReducer)

const rootReducer = combineReducers({
  [NBA]: nbaReducer,
  [MLB]: mlbReducer,
  sport,
})

export default rootReducer
