import { Model, attr } from 'redux-orm'
import { CREATE_SEASON } from '../actions'

export default class Season extends Model {
  static reducer(action, Season, session) {
    const { payload, type } = action
    switch (type) {
      case CREATE_SEASON:
        Season.create(payload)
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

