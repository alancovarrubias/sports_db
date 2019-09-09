import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { metadata, async } from '../actions'

const seasonId = handleActions({
  [metadata.selectSeasonId]: (_, { payload: { seasonId } }) => seasonId,
}, null)

const gameId = handleActions({
  [metadata.selectGameId]: (_, { payload: { gameId } }) => gameId,
}, null)

const seasonsFetched = handleActions({
  [async.seasonsFetched]: () => true,
}, false)

const gamesFetched = handleActions({
  [async.gamesFetched]: (state, { payload: { seasonId } }) => [seasonId, ...state],
}, [])

const statsFetched = handleActions({
  [async.statsFetched]: (state, { payload: { gameId } }) => [gameId, ...state],
}, [])

export default combineReducers({
  seasonId,
  gameId,
  seasonsFetched,
  gamesFetched,
  statsFetched,
})

