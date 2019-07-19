import React, { Component } from 'react'
import { connect } from 'react-redux'
import withDatabase from '../hoc/withDatabase'
import {
  fetchGames,
  selectPeriod,
  changeRange,
} from '../actions'
import GamesIndex from '../components/games/Index'

class Games extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props
    this.season = match.params.season
    dispatch(fetchGames(this.season))
  }
  
  componentWillReceiveProps(props) {
    const season = props.match.params.season
    if (this.season !== season) {
      this.componentDidMount()
    }
  }

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
  const { sport } = state
  const database = state[sport]
  const { season, games, period, range } = database
  const rows = games.map(game => ({...game.bets[period], ...game.lines[period], ...game}))
  return {
    season,
    rows,
    period,
    range,
    sport,
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
