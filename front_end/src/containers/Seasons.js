import React, { Component } from 'react'
import { connect } from 'react-redux'
import withDatabase from '../hoc/withDatabase'
import SeasonsComponent from '../components/Seasons'
import {
  selectSeasons,
  selectSeasonHeaders,
  selectSeasonKeys,
} from '../selectors'

class Seasons extends Component {
  rowClick = season => {
    const { history } = this.props
    history.push(`/seasons/${season.id}/games`)
  }

  render() {
    return <SeasonsComponent {...this.props} rowClick={this.rowClick} />
  }
}

const mapStateToProps = state => {
  return {
    seasons: selectSeasons(state),
    headers: selectSeasonHeaders(state),
    keys: selectSeasonKeys(state),
  }
}

export default connect(mapStateToProps)(withDatabase(Seasons))
