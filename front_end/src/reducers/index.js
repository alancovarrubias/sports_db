import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import { handleActions } from 'redux-actions'
import actions from '../actions'
import { NBA, MLB } from '../const'
import { namespaceReducerFactory } from '../helpers/namespaceModule'
import orm from '../models/orm'
import metaReducer from './metaReducer'

const nbaDatabase = namespaceReducerFactory(NBA)(createReducer(orm))
const mlbDatabase = namespaceReducerFactory(MLB)(createReducer(orm))
const nbaMeta = namespaceReducerFactory(NBA)(metaReducer)
const mlbMeta = namespaceReducerFactory(MLB)(metaReducer)

const sport = handleActions({
  [actions.toggleSport]: (_, { payload: { sport } }) => sport
}, MLB)

const period = handleActions({
  [actions.selectPeriod]: (_, { payload: { period } }) => Number(period),
}, 0)

const range = handleActions({
  [actions.selectRange]: (_, { payload: { range } }) => range,
}, 0)

const rootReducer = combineReducers({
  sport,
  range,
  period,
  nbaDatabase,
  mlbDatabase,
  nbaMeta,
  mlbMeta,
})

export default rootReducer
