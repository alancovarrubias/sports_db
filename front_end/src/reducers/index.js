import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import { handleActions } from 'redux-actions'
import { connectRouter } from 'connected-react-router'
import actions from '../actions'
import { NBA, MLB, DEFAULT_SPORT } from '../const'
import { namespaceReducerFactory } from '../helpers/namespaceModule'
import orm from '../models/orm'
import metaReducer from './metaReducer'

const nbaDatabase = namespaceReducerFactory(NBA)(createReducer(orm))
const mlbDatabase = namespaceReducerFactory(MLB)(createReducer(orm))
const nbaMeta = namespaceReducerFactory(NBA)(metaReducer)
const mlbMeta = namespaceReducerFactory(MLB)(metaReducer)

const sport = handleActions({
  [actions.selectSport]: (_, { payload: { sport, history } }) => sport,
}, DEFAULT_SPORT)

const period = handleActions({
  [actions.selectPeriod]: (_, { payload: { period } }) => Number(period),
}, 0)

const range = handleActions({
  [actions.selectRange]: (_, { payload: { range } }) => range,
}, 0)

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  sport,
  range,
  period,
  nbaDatabase,
  mlbDatabase,
  nbaMeta,
  mlbMeta,
})

export default createRootReducer
