import { Model, attr, fk } from 'redux-orm'
import { handleActions } from 'redux-actions'
import actions from '../actions'

const { createPlayer, createPlayers } = actions
export default class Player extends Model {
  static reducer(action, Player, session) {
    handleActions({
      [createPlayer]: (_, { payload: { player } }) => Player.upsert(player),
      [createPlayers]: (_, { payload: { players } }) => players.forEach(player => Player.upsert(player)),
    }, {})(null, action)
  }
}

Player.modelName = 'Player'
Player.fields = {
  id: attr(),
  season: fk('Season', 'models')
}

