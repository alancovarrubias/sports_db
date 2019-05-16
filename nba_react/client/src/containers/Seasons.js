import React, { Component } from 'react'
import { connect } from 'react-redux'
import SeasonIndex from '../components/seasons/Index'

class Seasons extends Component {
  constructor(props) {
    super(props);
    this.rowClick = this.rowClick.bind(this);
  }

  rowClick(season) {
    const { router } = this.props;
    router.navigate({ name: "Games", params: { seasonId: season.id } });
  }

  render() {
    return (<SeasonIndex {...this.props} rowClick={this.rowClick} />);
  }
}

function mapStateToProps(state) {
  const { seasons } = state;
  return {
    seasons
  };
}

export default connect(mapStateToProps)(Seasons);
