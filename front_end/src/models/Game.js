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
  season_id: fk({
    to: 'Season',
    as: 'season',
    relatedName: 'games',
  }),
  away_team_id: fk({
    to: 'Team',
    as: 'away_team',
    relatedName: 'away_games'
  }),
  home_team_id: fk({
    to: 'Team',
    as: 'home_team',
    relatedName: 'home_games'
  }),
}

