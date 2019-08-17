import fetch from 'cross-fetch'
import { namespaceActionFactory } from '../helpers/namespaceModule'
import { selectSeasons, selectSport } from '../selectors'
import {
  createSeason,
  selectSeason,
  createGames,
} from './'

const fetchSeasons = sport => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons`)
  const json = await response.json()
  const seasons = json.seasons
  const namespacedCreateSeason = namespaceActionFactory(sport)(createSeason)
  seasons.forEach(season => dispatch(namespacedCreateSeason(season)))
}

export const fetchGames = (sport, season) => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons/${season}/games`)
  const json = await response.json()
  const namespacedCreateGames = namespaceActionFactory(sport)(createGames)
  dispatch(namespacedCreateGames(json.games))
  dispatch(selectSeason(json.season))
}

export const fetchGame = (season, game) => async (dispatch, getState) => {
  const sport = getState().sport
  const response = await fetch(`/${sport}/seasons/${season}/games/${game}`)
  const json = await response.json()
  dispatch(selectSeason(json.season))
  // dispatch(receiveGame(normalizedGame))
}

const needSeason = (state) => {
  const seasons = selectSeasons(state)
  return seasons.length === 0
}

export const fetchData = (match) => async (dispatch, getState) => {
  const state = getState()
  const sport = selectSport(state)
  const { path, params: { season } } = match
  if (path === '/seasons' && needSeason(state)) {
    dispatch(fetchSeasons(sport))
  } else if (path === '/seasons/:season/games') {
    dispatch(fetchGames(sport, season))
  }
}
