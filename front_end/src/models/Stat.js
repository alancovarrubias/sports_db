import { Model, attr } from 'redux-orm'
// import { CREATE_STAT, CREATE_STATS } from '../actions'

export default class Stat extends Model {
  static reducer(action, Stat, session) {
    const { payload, type } = action
    switch (type) {
        /*
      case CREATE_STAT:
        Stat.upsert(payload)
        break
      case CREATE_STATS:
        payload.forEach(player => Stat.upsert(player))
        break
        */
      default:
        break
    }
  }
}

Stat.modelName = 'Stat'
Stat.fields = {
  id: attr(),
  year: attr(),
}

