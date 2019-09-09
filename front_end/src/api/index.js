import fetch from 'cross-fetch'
import {
  selectSport,
  selectSeasonId,
  selectGameId,
} from '../selectors'

const endpoints = {
  fetchSeasons: async (state) => fetch(`/${selectSport(state)}/seasons`),
  fetchGames: async (state) => fetch(`/${selectSport(state)}/seasons/${selectSeasonId(state)}/games`),
  fetchStats: async (state) => fetch(`/${selectSport(state)}/seasons/${selectSeasonId(state)}/games/${selectGameId(state)}`),
}

export default endpoints

