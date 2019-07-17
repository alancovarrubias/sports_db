import fetch from 'cross-fetch';
import { normalize, schema } from 'normalizr';
import { namespaceActionFactory } from '../helpers/namespace-module';

// import { NBA, MLB } from '../const/sports';
import {
  receiveSeasons,
  selectSeason,
  receiveGame,
  receiveGames,
} from './';

const fetchSeasons = () => async (dispatch, getState) => {
  const sport = getState().sport;
  const response = await fetch(`/${sport}/seasons`);
  const json = await response.json();
  const season = new schema.Entity('seasons');
  const request = new schema.Entity('request', {
    seasons: [season],
  });
  const normalizedData = normalize(json, request).entities;
  const seasons = normalizedData.seasons;
  const order = normalizedData.request[sport].seasons
  const namespacedReceiveSeasons = namespaceActionFactory(sport)(receiveSeasons);
  dispatch(namespacedReceiveSeasons({ order, ...seasons }));
};

export const fetchGames = season => async (dispatch, getState) => {
  const sport = getState().sport;
  const response = await fetch(`/${sport}/seasons/${season}/games`);
  const json = await response.json();
  dispatch(receiveGames(json.games));
  dispatch(selectSeason(json.season));
}

export const fetchGame = (season, game) => async (dispatch, getState) => {
  const sport = getState().sport;
  const response = await fetch(`/${sport}/seasons/${season}/games/${game}`)
  const json = await response.json();
  const teams = new schema.Entity('teams');
  const players = new schema.Entity('players');
  const stats = new schema.Entity('stats');
  const gameSchema = new schema.Entity('game', {
    away_team: teams,
    home_team: teams,
    away_players: [players],
    home_players: [players],
    away_stats: [stats],
    home_stats: [stats],
  });
  const normalizedGame = normalize(json.game, gameSchema);
  dispatch(selectSeason(json.season))
  dispatch(receiveGame(normalizedGame))
};

export const fetchData = () => async (dispatch, getState) => {
  dispatch(fetchSeasons());
  // dispatch(fetchGames());
};
