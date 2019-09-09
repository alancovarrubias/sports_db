import { createActions } from 'redux-actions'

const actions = createActions({
  DEFAULT_VALUES: props => props,
  SELECT_SEASON_ID: seasonId => ({ seasonId }),
  SELECT_GAME_ID: gameId => ({ gameId }),
  SELECT_PERIOD: period => ({ period }),
  SELECT_RANGE: range => ({ range }),
  SELECT_SPORT: sport => ({ sport }),
})
export default actions
