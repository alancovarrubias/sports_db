import { Model, attr } from 'redux-orm'
import { handleActions } from 'redux-actions'
import actions from '../actions/index'

const { createSeason, createSeasons } = actions
export default class Season extends Model {
  static reducer(action, Season, session) {
    handleActions({
      [createSeason]: (_, { payload: { season } }) => Season.upsert(season),
      [createSeasons]: (_, { payload: { seasons } }) => seasons.forEach(season => Season.upsert(season)),
    }, {})(null, action)
  }
}

Season.modelName = 'Season'
Season.fields = {
  id: attr(),
}

