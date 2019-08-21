import React, { Component } from 'react'
import { connect } from 'react-redux'
import withDatabase from '../hoc/withDatabase'
import {
  selectPeriod,
  changeRange,
} from '../actions'
import GamesIndex from '../components/games/Index'
import {
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
      <GamesIndex {...this.props} gameClick={this.gameClick} rangeChange={this.rangeChange} />
    )
  }
}

const mapStateToProps = state => {
  const sport = selectSport(state)
  const season = selectSeason(state)
  const games = selectGames(state)
  const period = 0
  const range = 0
  return { season, games, period, range, sport }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    selectPeriod: event => dispatch(selectPeriod(event.target.value)),
    changeRange: event => dispatch(changeRange(event.target.value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(Games))
