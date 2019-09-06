import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import withDatabase from '../hoc/withDatabase'
import SeasonsComponent from '../components/Seasons'
import {
  selectSeasons,
  selectSeasonHeaders,
  selectSeasonKeys,
} from '../selectors'

const mapStateToProps = (state) => {
  return {
    seasons: selectSeasons(state),
    headers: selectSeasonHeaders(state),
    keys: selectSeasonKeys(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    rowClick: season => dispatch(push(`/seasons/${season.id}/games`)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(SeasonsComponent))
