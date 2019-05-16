import fetch from 'cross-fetch'

export const RECEIVE_SEASONS = 'RECEIVE_SEASONS'
export function receiveSeasons(seasons) {
  return {
    type: RECEIVE_SEASONS,
    seasons
  };
}

export function fetchSeasons() {
  return function(dispatch) {
    return fetch('/api/seasons').then(
      async response => await response.json(),
      error => console.log(error)
    ).then(
      json => dispatch(receiveSeasons(json.seasons))
    );
  }
}

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export function receiveGames(games) {
  return {
    type: RECEIVE_GAMES,
    games: games
  };
}

export function fetchGames(seasonId) {
  return function(dispatch) {
    return fetch(`/api/seasons/${seasonId}/games`).then(
      async response => await response.json(),
      error => console.log(error)
    ).then(
      json => {
        dispatch(receiveGames(json.games))
        dispatch(selectSeason(json.season))
      }
    );
  }
}

export const RECEIVE_GAME = 'RECEIVE_GAME'
export function receiveGame(game) {
  return {
    type: RECEIVE_GAME,
    game
  };
}

export function fetchGame(seasonId, gameId) {
  return function(dispatch) {
    return fetch(`/api/seasons/${seasonId}/games/${gameId}.json`).then(
      async response => await response.json(),
      error => console.log(error)
    ).then(
      json => {
        dispatch(selectSeason(json.season))
        dispatch(receiveGame(json.game))
      }
    );
  }
}

export const SELECT_SEASON = 'SELECT_SEASON'
export function selectSeason(season) {
  return {
    type: SELECT_SEASON,
    season
  };
}

export const SELECT_PERIOD = 'SELECT_PERIOD'
export function selectPeriod(period) {
  return {
    type: SELECT_PERIOD,
    period
  };
}
