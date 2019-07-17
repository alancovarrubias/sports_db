export * from './async';
export * from './database';

export const TOGGLE_SPORT = 'TOGGLE_SPORT';
export const toggleSport = sport => ({
  type: TOGGLE_SPORT,
  sport,
});

export const SELECT_SEASON = 'SELECT_SEASON';
export const selectSeason = season => ({
  type: SELECT_SEASON,
  season,
});

export const SELECT_PERIOD = 'SELECT_PERIOD';
export const selectPeriod = period => ({
  type: SELECT_PERIOD,
  period,
});

export const CHANGE_RANGE = 'CHANGE_RANGE';
export const changeRange = range => ({
  type: CHANGE_RANGE,
  range,
});

