import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { namespaceActions } from '../helpers/namespace-module';
import { SPORTS } from '../const';
import { toggleSport, selectPeriod, fetchData } from '../actions';
import NavbarComponent from '../components/navbar/Navbar';

class Navbar extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

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
  const { sport } = state;
  const { seasons, period } = state[sport];
  const gamesLinks = seasons.order.map(id => seasons[id]).map(season => ({
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
    selectSport: sport => dispatch(toggleSport(sport)),
    fetchData: () => dispatch(fetchData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
