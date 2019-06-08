import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSeasons, selectSeason } from '../actions';
import SeasonIndex from '../components/seasons/Index';

class Seasons extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSeasons());
  }

  rowClick = season => {
    const { history } = this.props;
    history.push(`/seasons/${season.id}/games`);
  }

  render() {
    return <SeasonIndex {...this.props} rowClick={this.rowClick} />;
  }
}

const mapStateToProps = state => {
  const { sport } = state;
  const { seasons } = state[sport];
  return {
    seasons: seasons.order.map(id => seasons[id]),
    sport,
  };
}

export default connect(mapStateToProps)(Seasons);
