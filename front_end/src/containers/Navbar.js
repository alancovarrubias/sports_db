import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { namespaceActions } from '../helpers/namespace-module'
import { toggleSport, selectPeriod, fetchData } from '../actions'
import NavbarComponent from '../components/navbar/Navbar'

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

const mapStateToProps = state => {
  const { sport } = state
  const { entities, indices, period } = state[sport]
  const seasons = indices.seasons.index.map(i => entities.seasons[i])
  return {
    seasons,
    period,
    sport,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectPeriod: event => dispatch(selectPeriod(event.target.value)),
    toggleSport: sport => dispatch(toggleSport(sport)) && dispatch(fetchData()),
    fetchData: () => dispatch(fetchData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
