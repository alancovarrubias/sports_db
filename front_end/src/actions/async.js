import fetch from 'cross-fetch'
import { namespaceActionFactory } from '../helpers/namespaceModule'
import {
  selectSport,
  selectSeasonsFetch,
  selectGamesFetch,
} from '../selectors'
import {
  createSeasons,
  createSeason,
  createGames,
  chooseSeason,
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
  const namespacedCreateGames = namespaceActionFactory(sport)(createGames)
  const namespacedCreateSeason = namespaceActionFactory(sport)(createSeason)
  dispatch(namespacedCreateSeason(json.season))
  dispatch(namespacedCreateGames(json.games))
}

/*
const fetchGame = (sport, season, game) => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons/${season}/games/${game}`)
  const json = await response.json()
  dispatch(chooseSeason(json.season))
}
*/

export const fetchData = match => async (dispatch, getState) => {
  const state = getState()
  const sport = selectSport(state)
  const shouldFetchSeasons = selectSeasonsFetch(state)
  const shouldFetchGames = selectGamesFetch(state)
  let { path, params: { seasonId } } = match
  seasonId = parseInt(seasonId)
  if (!shouldFetchSeasons && path === '/seasons') {
    const namespacedSeasonsFetch = namespaceActionFactory(sport)(seasonsFetch)
    dispatch(namespacedSeasonsFetch())
    dispatch(fetchSeasons(sport))
  } else if (path === '/seasons/:seasonId/games') {
    const namespacedChooseSeason = namespaceActionFactory(sport)(chooseSeason)
    const namespacedGamesFetch = namespaceActionFactory(sport)(gamesFetch)
    if (!shouldFetchGames.includes(seasonId)) {
      dispatch(namespacedGamesFetch(seasonId))
      dispatch(fetchGames(sport, seasonId))
    }
    dispatch(namespacedChooseSeason(seasonId))
  }
}
