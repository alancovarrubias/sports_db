import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import withDatabase from '../hoc/withDatabase'
import GamesComponent from '../components/Games'
import { data } from '../actions'
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
    selectPeriod: (event) => dispatch(data.selectPeriod(Number(event.target.value))),
    changeRange: (event) => dispatch(data.selectRange(Number(event.target.value))),
    gameClick: (game) => dispatch(push(statsRoute(ownProps, { gameId: game.id }))),
    backClick: () => dispatch(push(seasonsRoute(ownProps))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(GamesComponent))
