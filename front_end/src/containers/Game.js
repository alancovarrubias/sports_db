import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGame, selectPeriod } from '../actions';
import GamesShow from '../components/games/Show';

class Game extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const season = match.params.season;
    const game = match.params.game;
    dispatch(fetchGame(season, game));
  }

  rowClick = row => {
    console.log(row);
  }

  render() {
    return (
      <GamesShow {...this.props} rowClick={this.rowClick} />
    );
  }
}

const mapStateToProps = state => {
  const { season, game, period, sport } = state;
  const away_team = game.away_team;
  const home_team = game.home_team;
  return {
    season,
    game,
    period,
    sport,
    away_team,
    home_team,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    selectPeriod: (event) => dispatch(selectPeriod(event.target.value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
