export const CREATE_SEASON = 'CREATE_SEASON'
export const createSeason = season => ({
  type: CREATE_SEASON,
  payload: season,
})

export const CREATE_GAME = 'CREATE_GAME'
export const createGame = game => ({
  type: CREATE_GAME,
  payload: game,
})

export const CREATE_GAMES = 'CREATE_GAMES'
export const createGames = games => ({
  type: CREATE_GAMES,
  payload: games,
})

export const SELECT_SEASON = 'SELECT_SEASON'
export const selectSeason = selectedSeason => ({
  type: SELECT_SEASON,
  selectedSeason,
})
