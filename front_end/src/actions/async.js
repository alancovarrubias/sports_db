import fetch from 'cross-fetch'
import { normalize, schema } from 'normalizr'
import { namespaceActionFactory } from '../helpers/namespaceModule'
import { selectSeasons, selectSport } from '../selectors'
import {
  receiveSeasons,
  selectSeason,
  receiveGame,
  receiveGames,
} from './'

const fetchSeasons = sport => async (dispatch, getState) => {
  const response = await fetch(`/${sport}/seasons`)
  const json = await response.json()
  const seasons = json.seasons
  // const season = new schema.Entity('seasons')
  // const mySchema = { seasons: [season] }
  // const normalizedData = normalize(json, mySchema)
  const namespacedReceiveSeasons = namespaceActionFactory(sport)(receiveSeasons)
  dispatch(namespacedReceiveSeasons(seasons))
}

export const fetchGames = season => async (dispatch, getState) => {
  const sport = getState().sport
  const response = await fetch(`/${sport}/seasons/${season}/games`)
  const json = await response.json()
  dispatch(receiveGames(json.games))
  dispatch(selectSeason(json.season))
}

export const fetchGame = (season, game) => async (dispatch, getState) => {
  const sport = getState().sport
  const response = await fetch(`/${sport}/seasons/${season}/games/${game}`)
  const json = await response.json()
  const teams = new schema.Entity('teams')
  const players = new schema.Entity('players')
  const stats = new schema.Entity('stats')
  const gameSchema = new schema.Entity('game', {
    away_team: teams,
    home_team: teams,
    away_players: [players],
    home_players: [players],
    away_stats: [stats],
    home_stats: [stats],
  })
  const normalizedGame = normalize(json.game, gameSchema)
  dispatch(selectSeason(json.season))
  dispatch(receiveGame(normalizedGame))
}

const needSeason = (state) => {
  const seasons = selectSeasons(state)
  return seasons.length === 0
}

export const fetchData = (match) => async (dispatch, getState) => {
  const state = getState()
  const sport = selectSport(state)
  const { path } = match
  if (path === '/seasons' && needSeason(state)) {
    dispatch(fetchSeasons(sport))
  } else if (path === '/seasons/:season/games') {
    // dispatch(fetchGames())
  }
}
