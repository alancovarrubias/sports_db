import orm from '../models/orm'
import { RECEIVE_SEASONS } from '../actions'

const emptyState = orm.getEmptyState()
export default (dbState = emptyState, action) => {
  const session = orm.session(dbState)

  const { Season } = session
  switch (action.type) {
    case RECEIVE_SEASONS:
      action.seasons.forEach(season => Season.create(season))
      break
    default:
      break
  }
  return session.state
}
