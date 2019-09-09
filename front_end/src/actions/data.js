import { createActions } from 'redux-actions'
import { DEFAULT_SPORT, DEFAULT_PERIOD } from '../const'

const dataActions = createActions({
  SELECT_SEASON_ID: seasonId => ({ seasonId }),
  SELECT_GAME_ID: gameId => ({ gameId }),
  SELECT_PERIOD: period => ({ period }),
  SELECT_RANGE: range => ({ range }),
  SELECT_SPORT: sport => ({ sport }),
})

const defaultValues = ({ sport, period }) => {
  return (dispatch) => {
    const initialSport = sport || DEFAULT_SPORT
    const initialPeriod = Number(period) || DEFAULT_PERIOD
    dispatch(dataActions.selectSport(initialSport))
    dispatch(dataActions.selectPeriod(initialPeriod))
  }
}

export default {
  defaultValues,
  ...dataActions,
}
