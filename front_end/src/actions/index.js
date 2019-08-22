import databaseActions from './database'
export * from './async'
export default databaseActions

export const TOGGLE_SPORT = 'TOGGLE_SPORT'
export const toggleSport = sport => ({
  type: TOGGLE_SPORT,
  sport,
})

export const SELECT_PERIOD = 'SELECT_PERIOD'
export const selectPeriod = period => ({
  type: SELECT_PERIOD,
  period,
})

export const CHANGE_RANGE = 'CHANGE_RANGE'
export const changeRange = range => ({
  type: CHANGE_RANGE,
  range,
})

