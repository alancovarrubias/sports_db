import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SPORTS } from '../const';
import { toggleSport, selectPeriod } from '../actions';
import NavbarComponent from '../components/navbar/Navbar';

class Navbar extends Component {
  brandClick = () => {
    const { history } = this.props;
    history.push('/seasons');
  }

  gamesClick = season => {
    const { history } = this.props;
    history.push(`/seasons/${season.id}/games`);
  }

  render() {
    return (
      <NavbarComponent {...this.props} brandClick={this.brandClick} gamesClick={this.gamesClick}/>
    );
  }
}

const mapStateToProps = state => {
  const { seasons, period, sport } = state;
  const gamesLinks = seasons.map(season => ({
    id: season.id,
    text: season.year,
    data: season,
  }));
  const gamesDropdown = { title: "Seasons", links: gamesLinks };
  const sportsLinks = SPORTS.map((sport, index) => ({
    id: index,
    text: sport.toUpperCase(),
    data: sport,
  }));
  const sportsDropdown = { title: "Sports", links: sportsLinks };
  return {
    seasons,
    period,
    sport,
    gamesDropdown,
    sportsDropdown,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectPeriod: event => dispatch(selectPeriod(event.target.value)),
    sportsClick: sport => dispatch(toggleSport(sport)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
