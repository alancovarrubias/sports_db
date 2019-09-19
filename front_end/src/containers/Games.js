import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import withDatabase from '../hoc/withDatabase'
import GamesComponent from '../components/Games'
import { statsRoute, seasonsRoute } from '../routes'
import {
  selectGameHeaders,
  selectGameKeys,
  selectSeason,
  selectGames,
} from '../selectors'

const mapStateToProps = (state) => {
  const games = selectGames(state)
  const bets = games.map(game => ({ ...game.bet, ...game.line }))
  return {
    headers: selectGameHeaders(state),
    keys: selectGameKeys(state),
    season: selectSeason(state),
    games,
    bets,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    statsClick: (game) => dispatch(push(statsRoute(ownProps, { gameId: game.id }))),
    seasonsClick: () => dispatch(push(seasonsRoute(ownProps))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(GamesComponent))
