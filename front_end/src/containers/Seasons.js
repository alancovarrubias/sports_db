import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSeasons } from '../actions';
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
  const { seasons, sport } = state;
  return {
    seasons,
    sport,
  };
}

export default connect(mapStateToProps)(Seasons);
