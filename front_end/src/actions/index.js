import fetch from 'cross-fetch';
export const TOGGLE_SPORT = 'TOGGLE_SPORT';
export const toggleSport = sport => {
  return {
    type: TOGGLE_SPORT,
    sport,
  };
}

export const RECEIVE_SEASONS = 'RECEIVE_SEASONS';
export const receiveSeasons = seasons => {
  return {
    type: RECEIVE_SEASONS,
    seasons,
  };
}

export const fetchSeasons = () => {
  return async (dispatch, getState) => {
    const sport = getState().sport;
    const response = await fetch(`/${sport}/seasons`);
    const json = await response.json();
    dispatch(receiveSeasons(json.seasons));
  }
}

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export const receiveGames = games => {
  return {
    type: RECEIVE_GAMES,
    games,
  };
}

export const fetchGames = season => {
  return async (dispatch, getState) => {
    const sport = getState().sport;
    const response = await fetch(`/${sport}/seasons/${season}/games`);
    const json = await response.json();
    dispatch(receiveGames(json.games));
    dispatch(selectSeason(json.season));
  }
}

export const RECEIVE_GAME = 'RECEIVE_GAME'
export const receiveGame = (game) => {
  return {
    type: RECEIVE_GAME,
    game
  };
}

export const fetchGame = (season, game) => {
  return async (dispatch, getState) => {
    const sport = getState().sport;
    const response = await fetch(`/${sport}/seasons/${season}/games/${game}`)
    const json = await response.json();
    dispatch(selectSeason(json.season))
    dispatch(receiveGame(json.game))
  }
}

export const SELECT_SEASON = 'SELECT_SEASON'
export const selectSeason = season => {
  return {
    type: SELECT_SEASON,
    season,
  };
}

export const SELECT_PERIOD = 'SELECT_PERIOD'
export const selectPeriod = period => {
  return {
    type: SELECT_PERIOD,
    period,
  };
}

export const NAVIGATE_GAME = 'NAVIGATE_GAME'
export const navigateGame = game => {
  return {
    type: NAVIGATE_GAME,
    game,
  };
}
