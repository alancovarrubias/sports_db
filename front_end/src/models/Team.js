import { Model, attr, fk } from 'redux-orm'
import { CREATE_TEAM, CREATE_TEAMS } from '../actions'

export default class Team extends Model {
  static reducer(action, Team, session) {
    const { payload, type } = action
    switch (type) {
      case CREATE_TEAM:
        Team.upsert(payload)
        break
      case CREATE_TEAMS:
        payload.forEach(player => Team.upsert(player))
        break
      default:
        break
    }
  }
}

Team.modelName = 'Team'
Team.fields = {
  id: attr(),
  season_id: fk({
    to: 'Season',
    as: 'season',
    relatedName: 'teams',
  }),
  name: attr(),
  abbr: attr(),
}

