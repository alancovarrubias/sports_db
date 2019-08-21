import fetch from 'cross-fetch'
import { namespaceActionFactory } from '../helpers/namespaceModule'
import {
  selectSport,
  selectSeasonsFetch,
  selectGamesFetch,
  selectGameFetch,
} from '../selectors'
import {
  createSeasons,
  createSeason,
  createTeams,
  createGames,
  createGame,
  createPlayers,
  // createStats,
  chooseSeason,
  chooseGame,
} from './'

export const SEASONS_FETCH = 'SEASONS_FETCH'
export const seasonsFetch = () => ({
  type: SEASONS_FETCH,
  payload: true,
})

const fetchSeasons = (sport) => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons`)
  const json = await response.json()
  const seasons = json.seasons
  const namespacedCreateSeasons = namespaceActionFactory(sport)(createSeasons)
  dispatch(namespacedCreateSeasons(seasons))
}

export const GAMES_FETCH = 'GAMES_FETCH'
export const gamesFetch = seasonId => ({
  type: GAMES_FETCH,
  payload: seasonId,
})

const fetchGames = (sport, seasonId) => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons/${seasonId}/games`)
  const json = await response.json()
  console.log(json)
  const namespacedCreateSeason = namespaceActionFactory(sport)(createSeason)
  const namespacedCreateTeams = namespaceActionFactory(sport)(createTeams)
  const namespacedCreateGames = namespaceActionFactory(sport)(createGames)
  dispatch(namespacedCreateSeason(json.season))
  dispatch(namespacedCreateTeams(json.teams))
  dispatch(namespacedCreateGames(json.games))
}

export const GAME_FETCH = 'GAME_FETCH'
export const gameFetch = gameId => ({
  type: GAME_FETCH,
  payload: gameId,
})

const fetchGame = (sport, seasonId, gameId) => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons/${seasonId}/games/${gameId}`)
  const json = await response.json()
  console.log(json)
  /*
  const namespacedCreatePlayers = namespaceActionFactory(sport)(createPlayers)
  const namespacedCreateStats = namespaceActionFactory(sport)(createStats)
  dispatch(namespacedCreatePlayers(json.away_players))
  dispatch(namespacedCreatePlayers(json.home_players))
  dispatch(namespacedCreateStats(json.away_stats))
  dispatch(namespacedCreateStats(json.home_stats))
  */
}

export const fetchData = match => async (dispatch, getState) => {
  const state = getState()
  const sport = selectSport(state)
  const shouldSeasonsFetch = selectSeasonsFetch(state)
  const shouldGamesFetch = selectGamesFetch(state)
  const shouldGameFetch = selectGameFetch(state)
  const namespacedChooseSeason = namespaceActionFactory(sport)(chooseSeason)
  const namespacedChooseGame = namespaceActionFactory(sport)(chooseGame)
  const { path, params: { seasonId, gameId } } = match
  if (!shouldSeasonsFetch && path === '/seasons') {
    const namespacedSeasonsFetch = namespaceActionFactory(sport)(seasonsFetch)
    dispatch(namespacedSeasonsFetch())
    dispatch(fetchSeasons(sport))
  } else if (path === '/seasons/:seasonId/games') {
    const namespacedGamesFetch = namespaceActionFactory(sport)(gamesFetch)
    if (!shouldGamesFetch.includes(seasonId)) {
      dispatch(namespacedGamesFetch(seasonId))
      dispatch(fetchGames(sport, seasonId))
    }
    dispatch(namespacedChooseSeason(seasonId))
  } else if (path === '/seasons/:seasonId/games/:gameId') {
    const namespacedGameFetch = namespaceActionFactory(sport)(gameFetch)
    if (!shouldGameFetch.includes(gameId)) {
      dispatch(namespacedGameFetch(gameId))
      dispatch(fetchGame(sport, seasonId, gameId))
    }
    dispatch(namespacedChooseSeason(seasonId))
    dispatch(namespacedChooseGame(gameId))
  }
}
