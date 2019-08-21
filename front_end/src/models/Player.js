import { Model, attr, fk } from 'redux-orm'
import { CREATE_PLAYER, CREATE_PLAYERS } from '../actions'

export default class Player extends Model {
  static reducer(action, Player, session) {
    const { payload, type } = action
    switch (type) {
      case CREATE_PLAYER:
        Player.upsert(payload)
        break
      case CREATE_PLAYERS:
        payload.forEach(player => Player.upsert(player))
        break
      default:
        break
    }
  }
}

Player.modelName = 'Player'
Player.fields = {
  id: attr(),
  season: fk('Season', 'models')
}

