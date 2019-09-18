import { Model, attr, fk } from 'redux-orm'
import { handleActions } from 'redux-actions'
import { model } from '../actions'

export default class Bet extends Model {
  static reducer(action, Bet, session) {
    handleActions({
      [model.createBet]: (_, { payload: { bet } }) => Bet.upsert(bet),
      [model.createBets]: (_, { payload: { bets } }) => bets.forEach(bet => Bet.upsert(bet)),
    }, {})(null, action)
  }
}

Bet.modelName = 'Bet'
Bet.fields = {
  id: attr(),
  game_id: fk('Game', 'bets'),
}

