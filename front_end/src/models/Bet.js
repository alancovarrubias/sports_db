import { Model, attr, fk } from 'redux-orm'
// import { CREATE_BET, CREATE_BETS } from '../actions'

export default class Bet extends Model {
  static reducer(action, Bet, session) {
    const { payload, type } = action
    switch (type) {
        /*
      case CREATE_BET:
        Bet.create(payload)
        break
      case CREATE_BETS:
        payload.forEach(game => Bet.create(game))
        break
        */
      default:
        break
    }
  }
}

Bet.modelName = 'Bet'
Bet.fields = {
  id: attr(),
  season_id: fk({
    to: 'Season',
    as: 'season',
    relatedName: 'bets',
  }),
  game_id: fk({
    to: 'Game',
    as: 'game',
    relatedName: 'bets'
  }),
}

