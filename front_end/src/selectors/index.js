import { createSelector } from 'reselect'
import { NBA, MLB } from '../const'
import orm from '../models/orm'

export const selectSport = state => state.sport
export const selectNba = state => state.nbaDatabase
export const selectMlb = state => state.mlbDatabase
export const selectDatabase = createSelector(
  selectSport,
  selectNba,
  selectMlb,
  (sport, nbaDatabase, mlbDatabase) => {
    let database
    switch (sport) {
      case NBA:
        database = nbaDatabase
        break
      case MLB:
        database = mlbDatabase
        break
      default:
        throw sport
    }
    return orm.session(database)
  }
)

export const selectSeasons = createSelector(
  selectDatabase,
  database => database.Season.all().toModelArray()
)

export const selectSeason = createSelector(
  state => state
)

export const selectGames = createSelector(
  selectDatabase,
  database => database.Game.all().toModelArray()
)
