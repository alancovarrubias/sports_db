import fetch from 'cross-fetch'
import { namespaceActions } from '../helpers/namespaceModule'
import {
  selectSport,
  selectSeasonId,
  selectGameId,
  selectSeasonsFetched,
  selectGamesFetched,
  selectStatsFetched,
} from '../selectors'
import actions from './database'

export const fetchData = (match) => async (dispatch, getState) => {
  const { path, params: { seasonId, gameId } } = match
  const state = getState()
  const sport = selectSport(state)
  const namespacedActions = namespaceActions(sport)(actions)
  const shouldSeasonsFetch = !selectSeasonsFetched(state)
  const shouldGamesFetch = !selectGamesFetched(state).includes(seasonId)
  const shouldStatsFetch = !selectStatsFetched(state).includes(gameId)
  if (shouldSeasonsFetch && path === '/seasons') {
    dispatch(fetchSeasons(namespacedActions))
    dispatch(namespacedActions.seasonsFetched())
  } else if (path === '/seasons/:seasonId/games') {
    dispatch(namespacedActions.seasonId(seasonId))
    if (shouldGamesFetch) {
      dispatch(fetchGames(namespacedActions))
      dispatch(namespacedActions.gamesFetched(seasonId))
    }
  } else if (path === '/seasons/:seasonId/games/:gameId') {
    if (shouldStatsFetch) {
      dispatch(fetchStats(namespacedActions))
      dispatch(namespacedActions.statsFetched(gameId))
    }
  }
}

const fetchSeasons = (actions) => async (dispatch, getState) => {
  const state = getState()
  const sport = selectSport(state)
  const response = await fetch(`/${sport}/seasons`)
  const json = await response.json()
  const seasons = json.seasons
  dispatch(actions.createSeasons(seasons))
}

const fetchGames = (actions) => async (dispatch, getState) => {
  const state = getState()
  const sport = selectSport(state)
  const seasonId = selectSeasonId(state)
  const response = await fetch(`/${sport}/seasons/${seasonId}/games`)
  const json = await response.json()
  dispatch(actions.createSeason(json.season))
  dispatch(actions.createTeams(json.teams))
  dispatch(actions.createGames(json.games))
}

const fetchStats = (actions) => async (dispatch, getState) => {
  const state = getState()
  const sport = selectSport(state)
  const seasonId = selectSeasonId(state)
  const gameId = selectGameId(state)
  const response = await fetch(`/${sport}/seasons/${seasonId}/games/${gameId}`)
  const json = await response.json()
  /*
  dispatch(actions.createPlayers(json.away_players))
  dispatch(actions.createPlayers(json.home_players))
  dispatch(actions.createStats(json.away_stats))
  dispatch(actions.createStats(json.home_stats))
  */
}

