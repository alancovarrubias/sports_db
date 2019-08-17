import { Model, attr, fk } from 'redux-orm'
import { CREATE_GAME, CREATE_GAMES } from '../actions'

export default class Game extends Model {
  static reducer(action, Game, session) {
    const { payload, type } = action
    switch (type) {
      case CREATE_GAME:
        Game.create(payload)
        break
      case CREATE_GAMES:
        payload.forEach(game => Game.create(game))
        break
      default:
        break
    }
  }
}

Game.modelName = 'Game'
Game.fields = {
  id: attr(),
  season: fk('Season'),
  away_team: attr(),
  home_team: attr(),
}

