import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import { TOGGLE_SPORT } from '../actions'
import { NBA, MLB } from '../const/sports'
import { namespaceReducerFactory } from '../helpers/namespaceModule'
import orm from '../models/orm'
import metaReducer from './metaReducer'

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
const nbaMeta = namespaceReducerFactory(NBA)(metaReducer)
const mlbMeta = namespaceReducerFactory(MLB)(metaReducer)

const rootReducer = combineReducers({
  sport,
  nbaDatabase,
  mlbDatabase,
  nbaMeta,
  mlbMeta,
})

export default rootReducer
