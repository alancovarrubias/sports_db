import React, { Component } from 'react'
import { connect } from 'react-redux'
import withDatabase from '../hoc/withDatabase'
import {
  selectPeriod,
  changeRange,
} from '../actions'
import GamesComponent from '../components/Games'
import {
  selectGameHeaders,
  selectGameKeys,
  selectSport,
  selectSeason,
  selectGames,
} from '../selectors'

class Games extends Component {
  gameClick = game => {
    const { history, season } = this.props
    history.push(`/seasons/${season.id}/games/${game.id}`)
  }

  render() {
    return (
      <GamesComponent {...this.props} gameClick={this.gameClick} rangeChange={this.rangeChange} />
    )
  }
}

const mapStateToProps = state => {
  return {
    headers: selectGameHeaders(state),
    keys: selectGameKeys(state),
    sport: selectSport(state),
    season: selectSeason(state),
    games: selectGames(state),
    period: 0,
    range: 0,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    selectPeriod: event => dispatch(selectPeriod(event.target.value)),
    changeRange: event => dispatch(changeRange(event.target.value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(Games))
