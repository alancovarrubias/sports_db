import { Model, attr, fk } from 'redux-orm'
import { handleActions } from 'redux-actions'
import actions from '../actions'

const { createLine, createLines } = actions
export default class Line extends Model {
  static reducer(action, Line, session) {
    handleActions({
      [createLine]: (_, { payload: { line } }) => Line.upsert(line),
      [createLines]: (_, { payload: { lines } }) => lines.forEach(line => Line.upsert(line)),
    }, {})(null, action)
  }
}

Line.modelName = 'Line'
Line.fields = {
  id: attr(),
  season_id: fk({
    to: 'Season',
    as: 'season',
    relatedName: 'lines',
  }),
  game_id: fk({
    to: 'Game',
    as: 'game',
    relatedName: 'lines'
  }),
}
