import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import { selectSeasons, selectSport } from '../selectors'
import withDatabase from '../hoc/withDatabase'
import NavbarComponent from '../components/Navbar'
import { SPORTS, PERIODS } from '../const'

class Navbar extends Component {
  brandClick = () => {
    const { history, queryParams: { sport } } = this.props
    history.push({
      pathname: '/seasons',
      search: `?sport=${sport}`,
    })
  }

  render() {
    return (
      <NavbarComponent {...this.props} brandClick={this.brandClick} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const seasons = selectSeasons(state)
  const sportsDropdown = {
    title: "Sports",
    links: SPORTS.map((sport, index) => ({
      id: index,
      text: sport,
      data: sport,
    })),
  }
  const sport = selectSport(state)
  const periods = PERIODS[sport]
  return {
    seasons,
    sportsDropdown,
    periods,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectPeriod: event => dispatch(actions.selectPeriod(event.target.value)),
    toggleSport: sport => dispatch(actions.toggleSport(sport)) && ownProps.history.push({ pathname: '/seasons', search: `?sport=${sport}` }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(Navbar))

  /*
  seasonGamesClick = season => {
    const { history } = this.props
    history.push(`/seasons/${season.id}/games`)
  }
  */
