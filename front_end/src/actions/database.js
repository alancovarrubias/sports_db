export const RECEIVE_SEASONS = 'RECEIVE_SEASONS'
export const receiveSeasons = seasons => ({
  type: RECEIVE_SEASONS,
  seasons,
})

export const SELECT_SEASON = 'SELECT_SEASON'
export const selectSeason = selectedSeason => ({
  type: SELECT_SEASON,
  selectedSeason,
})

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export const receiveGames = games => ({
  type: RECEIVE_GAMES,
  games,
})

export const RECEIVE_GAME = 'RECEIVE_GAME'
export const receiveGame = game => ({
  type: RECEIVE_GAME,
  game,
})

export const REQUEST_DATA = 'REQUEST_DATA'
export const requestData = options => ({
  type: REQUEST_DATA,
  options,
})
