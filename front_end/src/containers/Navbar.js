import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import actions from '../actions'
import { selectSeasons, selectSport } from '../selectors'
import withDatabase from '../hoc/withDatabase'
import NavbarComponent from '../components/Navbar'
import { SPORTS, PERIODS } from '../const'

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
    selectPeriod: event => dispatch(actions.selectPeriod(event.target.value)) && console.log(event.target.value),// ownProps.history.push({ pathname: ownProps.match.url, search: `?period=${event.target.value}` }),
    selectSport: sport => dispatch(actions.selectSport(sport)) && dispatch(push({ pathname: '/seasons', search: `?sport=${sport}` })),
    brandClick: () => dispatch(push('/seasons')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(NavbarComponent))
