import { connect } from 'react-redux'
import actions from '../actions'
import navigate from '../actions/navigate'
import withDatabase from '../hoc/withDatabase'
import NavbarComponent from '../components/Navbar'
import { selectSeasons, selectPeriod, selectPeriods, selectSportsDropdown } from '../selectors'

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
    selectPeriod: event => dispatch(actions.selectPeriod(event.target.value)) && dispatch(navigate.override(ownProps, { period: event.target.value })),
    selectSport: sport => dispatch(actions.selectSport(sport)) && dispatch(navigate.seasons(ownProps, { sport })),
    brandClick: () => dispatch(navigate.seasons(ownProps)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(NavbarComponent))
