import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from '../actions'

const seasonId = handleActions({
  [actions.selectSeasonId]: (_, { payload: { seasonId } }) => seasonId,
}, null)

const gameId = handleActions({
  [actions.selectGameId]: (_, { payload: { gameId } }) => gameId,
}, null)

const seasonsFetched = handleActions({
  [actions.seasonsFetched]: () => true,
}, false)

const gamesFetched = handleActions({
  [actions.gamesFetched]: (state, { payload: { seasonId } }) => [seasonId, ...state],
}, [])

const statsFetched = handleActions({
  [actions.statsFetched]: (state, { payload: { gameId } }) => [gameId, ...state],
}, [])

export default combineReducers({
  seasonId,
  gameId,
  seasonsFetched,
  gamesFetched,
  statsFetched,
})

