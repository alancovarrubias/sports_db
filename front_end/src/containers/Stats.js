import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
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

class Stats extends Component {
  render() {
    return (
      <StatsComponent {...this.props} />
    )
  }
}

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

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    selectPeriod: (event) => dispatch(actions.selectPeriod(event.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(Stats))
