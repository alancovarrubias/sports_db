import endpoints from './endpoints'
import actions from '../actions'
import {
  selectSport,
  selectSeasonsFetched,
  selectGamesFetched,
  selectStatsFetched,
} from '../selectors'
import { namespaceActions } from '../helpers/namespaceModule'

export const fetchData = (match) => async (dispatch, getState) => {
  const { path, params: { seasonId, gameId } } = match
  const state = getState()
  const sport = selectSport(state)
  const namespacedActions = namespaceActions(sport)(actions)
  const shouldSeasonsFetch = !selectSeasonsFetched(state)
  const shouldGamesFetch = !selectGamesFetched(state).includes(seasonId)
  const shouldStatsFetch = !selectStatsFetched(state).includes(gameId)
  if (shouldSeasonsFetch) {
    dispatch(fetchSeasons(namespacedActions))
    dispatch(namespacedActions.seasonsFetched())
  } else if (path === '/seasons/:seasonId/games') {
    dispatch(namespacedActions.selectSeasonId(seasonId))
    if (shouldGamesFetch) {
      dispatch(fetchGames(namespacedActions))
      dispatch(namespacedActions.gamesFetched(seasonId))
    }
  } else if (path === '/seasons/:seasonId/games/:gameId') {
    dispatch(namespacedActions.selectSeasonId(seasonId))
    dispatch(namespacedActions.selectGameId(gameId))
    if (shouldStatsFetch) {
      dispatch(fetchStats(namespacedActions))
      dispatch(namespacedActions.statsFetched(gameId))
    }
  }
}

const fetchSeasons = (actions) => async (dispatch, getState) => {
  const response = await endpoints.fetchSeasons(actions, getState())
  const json = await response.json()
  dispatch(actions.createSeasons(json.seasons))
}

const fetchGames = (actions) => async (dispatch, getState) => {
  const response = await endpoints.fetchGames(actions, getState())
  const json = await response.json()
  dispatch(actions.createSeason(json.season))
  dispatch(actions.createTeams(json.teams))
  dispatch(actions.createGames(json.games))
}

const fetchStats = (actions) => async (dispatch, getState) => {
  const response = await endpoints.fetchStats(actions, getState())
  const json = await response.json()
  dispatch(actions.createSeason(json.season))
  dispatch(actions.createGame(json.game))
  dispatch(actions.createTeams(json.teams))
  dispatch(actions.createPlayers(json.players))
  dispatch(actions.createStats(json.stats))
}

