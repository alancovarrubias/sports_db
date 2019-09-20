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
  [actions.selectSport]: (_, { payload: { sport } }) => sport,
}, DEFAULT_SPORT)

const period = handleActions({
  [actions.selectPeriod]: (_, { payload: { period } }) => period,
}, 0)

const DEFAULT_USER = { username: "", password: "", valid: false }
const user = handleActions({
  [actions.changePassword]: (user, { payload: { password } }) => ({ ...user, password }),
  [actions.changeUsername]: (user, { payload: { username } }) => ({ ...user, username }),
  [actions.selectUser]: (_, { payload: { user } }) => ({ ...user, valid: true }),
}, DEFAULT_USER)

const createRootReducer = history => combineReducers({
  user,
  sport,
  period,
  nbaDatabase,
  mlbDatabase,
  nbaMetadata,
  mlbMetadata,
  router: connectRouter(history),
})

export default createRootReducer
