import { connect } from 'react-redux'
import navigate from '../actions/navigate'
import withDatabase from '../hoc/withDatabase'
import StatsComponent from '../components/Stats'
import {
  selectStatHeaders,
  selectStatKeys,
  selectSport,
  selectSeason,
  selectAwayTeam,
  selectHomeTeam,
  selectAwayStats,
  selectHomeStats,
} from '../selectors'

const mapStateToProps = (state) => {
  return {
    headers: selectStatHeaders(state),
    keys: selectStatKeys(state),
    sport: selectSport(state),
    season: selectSeason(state),
    awayTeam: selectAwayTeam(state),
    homeTeam: selectHomeTeam(state),
    awayStats: selectAwayStats(state),
    homeStats: selectHomeStats(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    backClick: () => dispatch(navigate.games(ownProps))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(StatsComponent))
