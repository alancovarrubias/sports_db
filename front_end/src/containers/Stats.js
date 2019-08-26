import React from 'react'
import { connect } from 'react-redux'
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

const Stats = props => (
  <StatsComponent {...props} />
)

const mapStateToProps = state => {
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

export default connect(mapStateToProps)(withDatabase(Stats))
