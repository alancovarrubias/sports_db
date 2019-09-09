import { Model, attr, fk } from 'redux-orm'
import { handleActions } from 'redux-actions'
import { model } from '../actions'

export default class Player extends Model {
  static reducer(action, Player, session) {
    handleActions({
      [model.createPlayer]: (_, { payload: { player } }) => Player.upsert(player),
      [model.createPlayers]: (_, { payload: { players } }) => players.forEach(player => Player.upsert(player)),
    }, {})(null, action)
  }
}

Player.modelName = 'Player'
Player.fields = {
  id: attr(),
  team_id: fk({
    to: 'Team',
    as: 'team',
    relatedName: 'players',
  })
}

