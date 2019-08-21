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

export const CREATE_TEAM = 'CREATE_TEAM'
export const createTeam = team => ({
  type: CREATE_TEAM,
  payload: team,
})

export const CREATE_TEAMS = 'CREATE_TEAMS'
export const createTeams = teams => ({
  type: CREATE_TEAMS,
  payload: teams,
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

export const CREATE_PLAYER = 'CREATE_PLAYER'
export const createPlayer = player => ({
  type: CREATE_PLAYER,
  payload: player,
})

export const CREATE_PLAYERS = 'CREATE_PLAYERS'
export const createPlayers = players => ({
  type: CREATE_PLAYERS,
  payload: players,
})

export const CREATE_STAT = 'CREATE_STAT'
export const createStat = stat => ({
  type: CREATE_STAT,
  payload: stat,
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
