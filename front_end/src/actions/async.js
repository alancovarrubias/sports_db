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
  const namespacedSeasonsFetch = namespaceActionFactory(sport)(seasonsFetch)
  const namespacedCreateSeasons = namespaceActionFactory(sport)(createSeasons)
  dispatch(namespacedSeasonsFetch(seasons))
  dispatch(namespacedCreateSeasons(seasons))
}

export const GAMES_FETCH = 'GAMES_FETCH'
export const gamesFetch = seasonId => ({
  type: GAMES_FETCH,
  payload: seasonId,
})

const fetchGames = (sport, season) => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons/${season}/games`)
  const json = await response.json()
  const namespacedGamesFetch = namespaceActionFactory(sport)(gamesFetch)
  const namespacedCreateGames = namespaceActionFactory(sport)(createGames)
  const namespacedCreateSeason = namespaceActionFactory(sport)(createSeason)
  const namespacedChooseSeason = namespaceActionFactory(sport)(chooseSeason)
  dispatch(namespacedGamesFetch(json.season.id))
  dispatch(namespacedCreateSeason(json.season))
  dispatch(namespacedCreateGames(json.games))
  dispatch(namespacedChooseSeason(json.season.id))
}

/*
const fetchGame = (sport, season, game) => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons/${season}/games/${game}`)
  const json = await response.json()
  dispatch(chooseSeason(json.season))
}
*/

export const fetchData = (match) => async (dispatch, getState) => {
  const state = getState()
  const sport = selectSport(state)
  const seasonsFetch = selectSeasonsFetch(state)
  const gamesFetch = selectGamesFetch(state)
  const { path, params: { season } } = match
  if (!seasonsFetch && path === '/seasons') {
    dispatch(fetchSeasons(sport))
  } else if (!gamesFetch.includes(parseInt(season)) && path === '/seasons/:season/games') {
    dispatch(fetchGames(sport, season))
  }
}
