import { Model, attr } from 'redux-orm'
import { handleActions } from 'redux-actions'
import actions from '../actions'

const { createStat, createStats } = actions
export default class Stat extends Model {
  static reducer(action, Stat, session) {
    handleActions({
      [createStat]: (_, { payload: { stat } }) => Stat.upsert(stat),
      [createStats]: (_, { payload: { stats } }) => stats.forEach(stat => Stat.upsert(stat)),
    }, {})(null, action)
  }
}

Stat.modelName = 'Stat'
Stat.fields = {
  id: attr(),
  year: attr(),
}

