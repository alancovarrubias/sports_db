import { createActions } from 'redux-actions'

const modelActions = createActions({
  CREATE_SEASON: season => ({ season }),
  CREATE_SEASONS: seasons => ({ seasons }),
  CREATE_TEAM: team => ({ team }),
  CREATE_TEAMS: teams => ({ teams }),
  CREATE_GAME: game => ({ game }),
  CREATE_GAMES: games => ({ games }),
  CREATE_PLAYER: player => ({ player }),
  CREATE_PLAYERS: players => ({ players }),
  CREATE_STAT: stat => ({ stat }),
  CREATE_STATS: stats => ({ stats }),
  CREATE_BET: bet => ({ bet }),
  CREATE_BETS: bets => ({ bets }),
  CREATE_LINE: line => ({ line }),
  CREATE_LINES: lines => ({ lines }),
})

export default modelActions
