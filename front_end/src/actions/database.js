export const CREATE_SEASON = 'CREATE_SEASON'
export const createSeason = season => ({
  type: CREATE_SEASON,
  payload: season,
})

export const CREATE_SEASONS = 'CREATE_SEASONS'
export const createSeasons = seasons => ({
  type: CREATE_SEASONS,
  payload: seasons,
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

export const CHOOSE_SEASON = 'CHOOSE_SEASON'
export const chooseSeason = seasonId => ({
  type: CHOOSE_SEASON,
  payload: seasonId,
})

export const CHOOSE_GAME = 'CHOOSE_GAME'
export const chooseGame = gameId => ({
  type: CHOOSE_GAME,
  payload: gameId,
})
