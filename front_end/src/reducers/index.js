import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import { handleActions } from 'redux-actions'
import actions from '../actions'
import { NBA, MLB } from '../const'
import { namespaceReducerFactory } from '../helpers/namespaceModule'
import orm from '../models/orm'
import metaReducer from './metaReducer'

const sport = handleActions({
  [actions.toggleSport]: (_, { payload: { sport } }) => sport
}, MLB)
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
