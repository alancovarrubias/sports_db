import { Model, attr } from 'redux-orm'
import { CREATE_SEASON, CREATE_SEASONS } from '../actions'

export default class Season extends Model {
  static reducer(action, Season, session) {
    const { payload, type } = action
    switch (type) {
      case CREATE_SEASON:
        Season.upsert(payload)
        break
      case CREATE_SEASONS:
        payload.forEach(season => Season.upsert(season))
        break
      default:
        break
    }
  }
}

Season.modelName = 'Season'
Season.fields = {
  id: attr(),
  year: attr(),
}

