import { connect } from 'react-redux'
import withDatabase from '../hoc/withDatabase'
import GamesComponent from '../components/Games'
import router from '../actions/router'
import select from '../actions/data'
import {
  selectGameHeaders,
  selectGameKeys,
  selectSport,
  selectSeason,
  selectGames,
} from '../selectors'

const mapStateToProps = state => {
    range: 0,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeRange: event => dispatch(select.selectRange(Number(event.target.value))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(BetsComponent))
