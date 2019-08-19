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
  selectGames,
  selectSeason,
} from '../selectors'

class Games extends Component {
  rowClick = game => {
    const { history } = this.props
    history.push(`/seasons/${this.season}/games/${game.id}`)
  }
  

  render() {
    return (
      <GamesIndex {...this.props} rowClick={this.rowClick} rangeChange={this.rangeChange} />
    )
  }
}

const mapStateToProps = state => {
  const sport = selectSport(state)
  const season = selectSeason(state)
  const games = selectGames(state)
  const period = 0
  const range = 0
  const rows = games.map(game => ({...game.bets[period], ...game.lines[period], ...game}))
  return { season, rows, period, range, sport }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    selectPeriod: event => dispatch(selectPeriod(event.target.value)),
    changeRange: event => dispatch(changeRange(event.target.value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(Games))
