import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import { TOGGLE_SPORT } from '../actions'
import { NBA, MLB } from '../const/sports'
import orm from '../models/orm';
import { namespaceReducerFactory } from '../helpers/namespaceModule'
import ormReducer from './ormReducer'

const sport = (state = '', action) => {
  switch (action.type) {
    case TOGGLE_SPORT:
      return action.sport
    default:
      return state
  }
}

const nbaDatabase = namespaceReducerFactory(NBA)(createReducer(orm))
const mlbDatabase = namespaceReducerFactory(MLB)(createReducer(orm))

const rootReducer = combineReducers({
  sport,
  nbaDatabase,
  mlbDatabase,
})

export default rootReducer
