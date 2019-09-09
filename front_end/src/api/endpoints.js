import fetch from 'cross-fetch'
import {
  selectSport,
  selectSeasonId,
  selectGameId,
} from '../selectors'

const endpoints = {
  fetchSeasons: async (actions, state) => fetch(`/${selectSport(state)}/seasons`),
  fetchGames: async (actions, state) => fetch(`/${selectSport(state)}/seasons/${selectSeasonId(state)}/games`),
  fetchStats: async (actions, state) => fetch(`/${selectSport(state)}/seasons/${selectSeasonId(state)}/games/${selectGameId(state)}`),
}

export default endpoints
