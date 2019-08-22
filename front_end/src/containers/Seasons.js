import React, { Component } from 'react'
import { connect } from 'react-redux'
import withDatabase from '../hoc/withDatabase'
import SeasonIndex from '../components/seasons/Index'
import { selectSeasons } from '../selectors'

class Seasons extends Component {
  rowClick = season => {
    const { history } = this.props
    history.push(`/seasons/${season.id}/games`)
  }

  render() {
    return <SeasonIndex {...this.props} rowClick={this.rowClick} />
  }
}

const mapStateToProps = state => {
  const seasons = selectSeasons(state)
  return {
    seasons,
  }
}

export default connect(mapStateToProps)(withDatabase(Seasons))
