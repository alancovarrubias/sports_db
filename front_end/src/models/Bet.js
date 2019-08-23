import { Model, attr, fk } from 'redux-orm'
import { handleActions } from 'redux-actions'
import actions from '../actions'

const { createBet, createBets } = actions
export default class Bet extends Model {
  static reducer(action, Bet, session) {
    handleActions({
      [createBet]: (_, { payload: { bet } }) => Bet.upsert(bet),
      [createBets]: (_, { payload: { bets } }) => bets.forEach(bet => Bet.upsert(bet)),
    }, {})(null, action)
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

