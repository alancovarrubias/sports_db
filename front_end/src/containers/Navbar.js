import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSeasons } from '../selectors'
import { toggleSport, selectPeriod } from '../actions'
import withDatabase from '../hoc/withDatabase'
import NavbarComponent from '../components/Navbar'

class Navbar extends Component {
  brandClick = () => {
    const { history } = this.props
    history.push('/seasons')
  }

  seasonGamesClick = season => {
    const { history } = this.props
    history.push(`/seasons/${season.id}/games`)
  }

  render() {
    return (
      <NavbarComponent {...this.props} brandClick={this.brandClick} seasonGamesClick={this.seasonGamesClick} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const seasons = selectSeasons(state)
  return {
    seasons,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectPeriod: event => dispatch(selectPeriod(event.target.value)),
    toggleSport: sport => dispatch(toggleSport(sport)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(Navbar))
