import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGame, selectPeriod } from '../actions'
import GamesShow from '../components/games/Show'

class Game extends Component {
  componentDidMount() {
    const seasonId = this.props.response.params.seasonId;
    const gameId = this.props.response.params.gameId;
    const { dispatch } = this.props;
    dispatch(fetchGame(seasonId, gameId));
  }

  render() {
    return (<GamesShow {...this.props} />);
  }
}

function mapStateToProps(state) {
  const { season, game, period } = state;
  return {
    season,
    game,
    period
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    selectPeriod: (event) => dispatch(selectPeriod(event.target.value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
