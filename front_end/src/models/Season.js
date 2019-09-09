import { Model, attr } from 'redux-orm'
import { handleActions } from 'redux-actions'
import { model } from '../actions/index'

export default class Season extends Model {
  static reducer(action, Season, session) {
    handleActions({
      [model.createSeason]: (_, { payload: { season } }) => Season.upsert(season),
      [model.createSeasons]: (_, { payload: { seasons } }) => seasons.forEach(season => Season.upsert(season)),
    }, {})(null, action)
  }
}

Season.modelName = 'Season'
Season.fields = {
  id: attr(),
}

