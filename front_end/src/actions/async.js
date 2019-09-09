import { createActions } from 'redux-actions'

import api from '../api'
import { namespaceActions } from '../helpers/namespaceModule'
import {
  selectSport,
  selectSeasonsFetched,
  selectGamesFetched,
  selectStatsFetched,
} from '../selectors'

import actions from './index'

const asyncActions = createActions({
  SEASONS_FETCHED: () => true,
  GAMES_FETCHED: seasonId => ({ seasonId }),
  STATS_FETCHED: gameId => ({ gameId }),
})

const fetchSeasons = (actions) => async (dispatch, getState) => {
  const response = await api.fetchSeasons(getState())
  const { seasons } = await response.json()
  dispatch(actions.createSeasons(seasons))
}

const fetchGames = (actions) => async (dispatch, getState) => {
  const response = await api.fetchGames(getState())
  const { season, teams, games } = await response.json()
  dispatch(actions.createSeason(season))
  dispatch(actions.createTeams(teams))
  dispatch(actions.createGames(games))
}

const fetchStats = (actions) => async (dispatch, getState) => {
  const response = await api.fetchStats(getState())
  const { season, game, teams, players, stats } = await response.json()
  dispatch(actions.createSeason(season))
  dispatch(actions.createGame(game))
  dispatch(actions.createTeams(teams))
  dispatch(actions.createPlayers(players))
  dispatch(actions.createStats(stats))
}

const fetchData = (props) => async (dispatch, getState) => {
  const { match: { path, params: { seasonId, gameId } } } = props
  const state = getState()
  const sport = selectSport(state)
  const nsActions = namespaceActions(sport)(actions)
  const shouldSeasonsFetch = !selectSeasonsFetched(state)
  const shouldGamesFetch = !selectGamesFetched(state).includes(seasonId)
  const shouldStatsFetch = !selectStatsFetched(state).includes(gameId)
  if (shouldSeasonsFetch) {
    dispatch(fetchSeasons(nsActions))
    dispatch(nsActions.seasonsFetched())
  } else if (path === '/seasons/:seasonId/games') {
    dispatch(nsActions.selectSeasonId(seasonId))
    if (shouldGamesFetch) {
      dispatch(fetchGames(nsActions))
      dispatch(nsActions.gamesFetched(seasonId))
    }
  } else if (path === '/seasons/:seasonId/games/:gameId') {
    dispatch(nsActions.selectSeasonId(seasonId))
    dispatch(nsActions.selectGameId(gameId))
    if (shouldStatsFetch) {
      dispatch(fetchStats(nsActions))
      dispatch(nsActions.statsFetched(gameId))
    }
  }
}

export default {
  ...asyncActions,
  fetchData,
}
