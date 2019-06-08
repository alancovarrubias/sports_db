export const RECEIVE_NBA_SEASONS = 'RECEIVE_NBA_SEASONS';
export const receiveNbaSeasons = seasons => ({
  type: RECEIVE_NBA_SEASONS,
  seasons,
});

export const SELECT_NBA_SEASON = 'SELECT_NBA_SEASON';
export const selectNbaSeason = selectedSeason => ({
  type: SELECT_NBA_SEASON,
  selectedSeason,
});

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const receiveGames = games => ({
  type: RECEIVE_GAMES,
  games,
});

export const RECEIVE_GAME = 'RECEIVE_GAME';
export const receiveGame = game => ({
  type: RECEIVE_GAME,
  game,
});
