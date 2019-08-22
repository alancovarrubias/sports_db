import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from '../actions'

const seasonId = handleActions({
  [actions.seasonId]: (_, { payload: { seasonId } }) => seasonId,
}, null)

const gameId = handleActions({
  [actions.gameId]: (_, { payload: { gameId } }) => gameId,
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

/*
const seasonsFetch = (state = false, action) => {
  const { payload, type } = action
  switch (type) {
    case SEASONS_FETCH:
      return payload
    default:
      return state
  }
}

const gamesFetch = (state = [], action) => {
  const { payload, type } = action
  switch (type) {
    case GAMES_FETCH:
      return [payload, ...state]
    default:
      return state
  }
}

const gameFetch = (state = [], action) => {
  const { payload, type } = action
  switch (type) {
    case GAME_FETCH:
      return [payload, ...state]
    default:
      return state
  }
}
*/

export default combineReducers({
  seasonId,
  gameId,
  seasonsFetched,
  gamesFetched,
  statsFetched,
})

