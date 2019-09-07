import { connect } from 'react-redux'
import withDatabase from '../hoc/withDatabase'
import GamesComponent from '../components/Games'
import actions from '../actions'
import navigate from '../actions/navigate'
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
    selectPeriod: event => dispatch(actions.selectPeriod(Number(event.target.value))),
    changeRange: event => dispatch(actions.selectRange(Number(event.target.value))),
    gameClick: game => dispatch(navigate.stats(ownProps, { gameId: game.id })),
    backClick: () => dispatch(navigate.seasons(ownProps)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withDatabase(GamesComponent))
