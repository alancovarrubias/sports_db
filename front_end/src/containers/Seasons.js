import { connect } from 'react-redux'
import withDatabase from '../hoc/withDatabase'
import SeasonsComponent from '../components/Seasons'
import {
  selectSeasons,
  selectSeasonHeaders,
  selectSeasonKeys,
} from '../selectors'
import navigate from '../actions/navigate'

const mapStateToProps = (state) => {
  return {
    seasons: selectSeasons(state),
    headers: selectSeasonHeaders(state),
    keys: selectSeasonKeys(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    rowClick: season => dispatch(navigate.games(ownProps, { seasonId: season.id })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(SeasonsComponent))
