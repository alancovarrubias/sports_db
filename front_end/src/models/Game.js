import { Model, attr, fk } from 'redux-orm'

export default class Game extends Model {
}

Game.modelName = 'Game'
Game.fields = {
  id: attr(),
  season: fk('Season'),
  away_team: attr(),
  home_team: attr(),
}

