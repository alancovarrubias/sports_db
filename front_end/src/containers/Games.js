import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import withDatabase from '../hoc/withDatabase'
import GamesComponent from '../components/Games'
import { select } from '../actions'
import { statsRoute, seasonsRoute } from '../routes'
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
  return {
    selectPeriod: (event) => dispatch(select.selectPeriod(Number(event.target.value))),
    changeRange: (event) => dispatch(select.selectRange(Number(event.target.value))),
    statsClick: (game) => dispatch(push(statsRoute(ownProps, { gameId: game.id }))),
    seasonsClick: () => dispatch(push(seasonsRoute(ownProps))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(GamesComponent))
