import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import withDatabase from '../hoc/withDatabase'
import SeasonsComponent from '../components/Seasons'
import {
  selectSeasons,
  selectSeasonHeaders,
  selectSeasonKeys,
} from '../selectors'
import { gamesRoute } from '../routes'

const mapStateToProps = (state) => {
  return {
    seasons: selectSeasons(state),
    headers: selectSeasonHeaders(state),
    keys: selectSeasonKeys(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    gamesClick: season => dispatch(push(gamesRoute(ownProps, { seasonId: season.id }))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(SeasonsComponent))
