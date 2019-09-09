import { createActions } from 'redux-actions'
import { DEFAULT_SPORT, DEFAULT_PERIOD } from '../const'

const dataActions = createActions({
  SELECT_SEASON_ID: seasonId => ({ seasonId }),
  SELECT_GAME_ID: gameId => ({ gameId }),
  SELECT_PERIOD: period => ({ period }),
  SELECT_RANGE: range => ({ range }),
  SELECT_SPORT: sport => ({ sport }),
})

const defaultValues = ({ queryParams: { sport, period } }) => {
  return (dispatch) => {
    dispatch(dataActions.selectSport(sport || DEFAULT_SPORT))
    dispatch(dataActions.selectPeriod(Number(period) || DEFAULT_PERIOD))
  }
}

export default {
  ...dataActions,
  defaultValues,
}
