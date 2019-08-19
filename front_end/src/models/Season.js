import { Model, attr } from 'redux-orm'
import { CREATE_SEASON, CREATE_SEASONS } from '../actions'

export default class Season extends Model {
  static reducer(action, Season, session) {
    const { payload, type } = action
    switch (type) {
      case CREATE_SEASON:
        this.createSeason(Season, payload)
        break
      case CREATE_SEASONS:
        payload.forEach(season => this.createSeason(Season, season))
        break
      default:
        break
    }
  }

  static createSeason(Season, season) {
    if(!Season.idExists(season.id)) {
      Season.create(season)
    }
  }
}

Season.modelName = 'Season'
Season.fields = {
  id: attr(),
  year: attr(),
}

