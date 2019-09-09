import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import withDatabase from '../hoc/withDatabase'
import NavbarComponent from '../components/Navbar'

import { selectSeasons, selectPeriod, selectPeriods, selectSportsDropdown } from '../selectors'
import { seasonsRoute, changeQueryParams } from '../routes'
import { select } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    seasons: selectSeasons(state),
    period: selectPeriod(state),
    periods: selectPeriods(state),
    sportsDropdown: selectSportsDropdown(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectPeriod: event => dispatch(select.selectPeriod(event.target.value)) && dispatch(push(changeQueryParams(ownProps, { period: event.target.value }))),
    selectSport: sport => dispatch(select.selectSport(sport)) && dispatch(push(seasonsRoute(ownProps, { sport }))),
    seasonsClick: () => dispatch(push(seasonsRoute(ownProps))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(NavbarComponent))
