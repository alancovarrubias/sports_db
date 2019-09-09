import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { gamesRoute } from '../routes'
import withDatabase from '../hoc/withDatabase'
import StatsComponent from '../components/Stats'
import {
  selectStatHeaders,
  selectStatKeys,
  selectSeason,
  selectAwayTeam,
  selectHomeTeam,
  selectAwayStats,
  selectHomeStats,
} from '../selectors'

const mapStateToProps = (state) => {
  return {
    season: selectSeason(state),
    awayTeam: selectAwayTeam(state),
    homeTeam: selectHomeTeam(state),
    awayStats: selectAwayStats(state),
    homeStats: selectHomeStats(state),
    headers: selectStatHeaders(state),
    keys: selectStatKeys(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    gamesClick: () => dispatch(push(gamesRoute(ownProps))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(StatsComponent))
