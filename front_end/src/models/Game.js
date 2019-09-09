import { Model, attr, fk } from 'redux-orm'
import { handleActions } from 'redux-actions'
import { model } from '../actions'

export default class Game extends Model {
  static reducer(action, Game, session) {
    handleActions({
      [model.createGame]: (_, { payload: { game } }) => Game.upsert(game),
      [model.createGames]: (_, { payload: { games } }) => games.forEach(game => Game.upsert(game)),
    }, {})(null, action)
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

