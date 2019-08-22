import fetch from 'cross-fetch'
import { namespaceActions, namespaceActionFactory } from '../helpers/namespaceModule'
import {
  selectSport,
  selectSeasonsFetched,
  selectGamesFetched,
  selectStatsFetched,
} from '../selectors'
import actions from './'

export const fetchData = match => async (dispatch, getState) => {
  const { path, params: { seasonId, gameId } } = match
  const state = getState()
  const sport = selectSport(state)
  const namespacedActions = namespaceActions(sport)(actions)
  const shouldSeasonsFetch = !selectSeasonsFetched(state)
  const shouldGamesFetch = !selectGamesFetched(state).includes(seasonId)
  const shouldStatsFetch = !selectStatsFetched(state).includes(gameId)
  if (shouldSeasonsFetch && path === '/seasons') {
    dispatch(namespacedActions.seasonsFetched())
    dispatch(fetchSeasons(namespacedActions, sport))
  } else if (path === '/seasons/:seasonId/games') {
    dispatch(namespacedActions.seasonId(seasonId))
    if (shouldGamesFetch) {
      dispatch(fetchGames(namespacedActions, sport, seasonId))
      dispatch(namespacedActions.gamesFetched(seasonId))
    }
  } else if (path === '/seasons/:seasonId/games/:gameId') {
    if (shouldStatsFetch) {
      dispatch(fetchStats(namespacedActions, sport, seasonId, gameId))
      dispatch(namespacedActions.statsFetched(gameId))
    }
  }
}

const fetchSeasons = (actions, sport) => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons`)
  const json = await response.json()
  const seasons = json.seasons
  dispatch(actions.createSeasons(seasons))
}

const fetchGames = (actions, sport, seasonId) => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons/${seasonId}/games`)
  const json = await response.json()
  dispatch(actions.createSeason(json.season))
  dispatch(actions.createTeams(json.teams))
  dispatch(actions.createGames(json.games))
}

const fetchStats = (actions, sport, seasonId, gameId) => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons/${seasonId}/games/${gameId}`)
  const json = await response.json()
  /*
  dispatch(actions.createPlayers(json.away_players))
  dispatch(actions.createPlayers(json.home_players))
  dispatch(actions.createStats(json.away_stats))
  dispatch(actions.createStats(json.home_stats))
  */
}

