import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import withDatabase from '../hoc/withDatabase'
import GamesComponent from '../components/Games'
import { metadata } from '../actions'
import { statsRoute, seasonsRoute } from '../routes'
import {
  selectGameHeaders,
  selectGameKeys,
  selectSport,
  selectSeason,
  selectGames,
} from '../selectors'

const mapStateToProps = (state) => {
  return {
    headers: selectGameHeaders(state),
    keys: selectGameKeys(state),
    season: selectSeason(state),
    games: selectGames(state),
    period: 0,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    statsClick: (game) => dispatch(push(statsRoute(ownProps, { gameId: game.id }))),
    seasonsClick: () => dispatch(push(seasonsRoute(ownProps))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(GamesComponent))
