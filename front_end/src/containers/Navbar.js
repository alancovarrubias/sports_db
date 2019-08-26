import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import { selectSeasons } from '../selectors'
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectPeriod: event => dispatch(actions.selectPeriod(event.target.value)),
    toggleSport: sport => dispatch(actions.toggleSport(sport)) && ownProps.history.push({ pathname: '/seasons', search: `?sport=${sport}` }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(Navbar))
