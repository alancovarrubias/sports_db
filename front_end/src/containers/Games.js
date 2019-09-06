import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import withDatabase from '../hoc/withDatabase'
import GamesComponent from '../components/Games'
import actions from '../actions'
import {
  selectGameHeaders,
  selectGameKeys,
  selectSport,
  selectSeason,
  selectGames,
} from '../selectors'

const mapStateToProps = state => {
  return {
    sport: selectSport(state),
    headers: selectGameHeaders(state),
    keys: selectGameKeys(state),
    season: selectSeason(state),
    games: selectGames(state),
    period: 0,
    range: 0,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { match: { params: { seasonId } } } = ownProps
  return {
    selectPeriod: event => dispatch(actions.selectPeriod(event.target.value)),
    changeRange: event => dispatch(actions.selectRange(event.target.value)),
    gameClick: game => dispatch(push(`/seasons/${seasonId}/games/${game.id}`)),
    backClick: () => dispatch(push(`/seasons`)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(GamesComponent))
