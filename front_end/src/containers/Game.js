import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPeriod } from '../actions'
import GamesShow from '../components/games/Show'
import withDatabase from '../hoc/withDatabase'
import {
  selectSport,
  selectSeason,
  selectGame,
} from '../selectors'

class Game extends Component {
  rowClick = row => {
    console.log(row)
  }

  render() {
    return (
      <GamesShow {...this.props} rowClick={this.rowClick} />
    )
  }
}

const mapStateToProps = state => {
  const sport = selectSport(state)
  const season = selectSeason(state)
  const game = selectGame(state)
  return {
    sport,
    season,
    game,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    selectPeriod: (event) => dispatch(selectPeriod(event.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(Game))
