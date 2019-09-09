import { createActions } from 'redux-actions'

const actions = createActions({
  CHANGE_QUERY_PARAMS: props => props,
  SEASONS_ROUTE: props => props,
  GAMES_ROUTE: props => props,
  STATS_ROUTE: props => props,
})
export default actions
