import fetch from 'cross-fetch'
import {
  selectSport,
  selectSeasonId,
  selectGameId,
} from '../selectors'

const authorizedFetch = (path) => fetch(path, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
  },
})

const endpoints = {
  getUser: async () => authorizedFetch('/NBA/user'),
  fetchSeasons: async (state) => authorizedFetch(`/${selectSport(state)}/seasons`),
  fetchGames: async (state) => authorizedFetch(`/${selectSport(state)}/seasons/${selectSeasonId(state)}/games`),
  fetchStats: async (state) => authorizedFetch(`/${selectSport(state)}/seasons/${selectSeasonId(state)}/games/${selectGameId(state)}`),
  authenticate: async ({ username, password }) => fetch('/NBA/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }),
}

export default endpoints

