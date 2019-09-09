import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import { handleActions } from 'redux-actions'
import { connectRouter } from 'connected-react-router'
import actions from '../actions'
import { NBA, MLB, DEFAULT_SPORT } from '../const'
import { namespaceReducerFactory } from '../helpers/namespaceModule'
import orm from '../models/orm'
import metadataReducer from './metadataReducer'

const nbaDatabase = namespaceReducerFactory(NBA)(createReducer(orm))
const mlbDatabase = namespaceReducerFactory(MLB)(createReducer(orm))
const nbaMetadata = namespaceReducerFactory(NBA)(metadataReducer)
const mlbMetadata = namespaceReducerFactory(MLB)(metadataReducer)

const sport = handleActions({
  [actions.selectSport]: (_, { payload: { sport, history } }) => sport,
}, DEFAULT_SPORT)

const period = handleActions({
  [actions.selectPeriod]: (_, { payload: { period } }) => period,
}, 0)

const createRootReducer = history => combineReducers({
  sport,
  period,
  nbaDatabase,
  mlbDatabase,
  nbaMetadata,
  mlbMetadata,
  router: connectRouter(history),
})

export default createRootReducer
