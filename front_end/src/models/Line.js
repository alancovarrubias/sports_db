import { Model, attr, fk } from 'redux-orm'
// import { CREATE_LINE, CREATE_LINES } from '../actions'

export default class Line extends Model {
  static reducer(action, Line, session) {
    const { payload, type } = action
    switch (type) {
        /*
      case CREATE_LINE:
        Line.create(payload)
        break
      case CREATE_LINES:
        payload.forEach(game => Line.create(game))
        break
        */
      default:
        break
    }
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
