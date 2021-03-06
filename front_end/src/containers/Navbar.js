import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import withDatabase from '../hoc/withDatabase'
import NavbarComponent from '../components/Navbar'

import { selectPeriod, selectPeriods, selectSportsDropdown, selectUser } from '../selectors'
import { seasonsRoute, changeQueryParams } from '../routes'
import { metadata, auth } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: selectUser(state),
    period: selectPeriod(state),
    periods: selectPeriods(state),
    sportsDropdown: selectSportsDropdown(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectSport: sport => dispatch(metadata.selectSport(sport)) && dispatch(push(seasonsRoute(ownProps, { sport }))),
    selectPeriod: event => dispatch(metadata.selectPeriod(event.target.value)) && dispatch(push(changeQueryParams(ownProps, { period: event.target.value }))),
    seasonsClick: () => dispatch(push(seasonsRoute(ownProps))),
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(NavbarComponent))
