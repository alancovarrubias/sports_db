import { Model, attr, fk } from 'redux-orm'
import { handleActions } from 'redux-actions'
import { model } from '../actions'

export default class Stat extends Model {
  static reducer(action, Stat, session) {
    handleActions({
      [model.createStat]: (_, { payload: { stat } }) => Stat.upsert(stat),
      [model.createStats]: (_, { payload: { stats } }) => stats.forEach(stat => Stat.upsert(stat)),
    }, {})(null, action)
  }
}

Stat.modelName = 'Stat'
Stat.fields = {
  id: attr(),
  game_id: fk({
    to: 'Game',
    as: 'game',
    relatedName: 'stats',
  }),
  model_id: fk({
    to: 'Player',
    as: 'player',
    relatedName: 'stats',
  })
}

