import { Model, attr, fk } from 'redux-orm'
import { handleActions } from 'redux-actions'
import actions from '../actions'

const { createTeam, createTeams } = actions
export default class Team extends Model {
  static reducer(action = {}, Team, session) {
    handleActions({
      [createTeam]: (_, { payload: { team } }) => Team.upsert(team),
      [createTeams]: (_, { payload: { teams } }) => teams.forEach(team => Team.upsert(team)),
    }, {})(null, action)
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
}

