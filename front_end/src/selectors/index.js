import { createSelector } from 'reselect'
import { NBA, MLB } from '../const'
import orm from '../models/orm'

export const selectSport = state => state.sport
export const selectNbaDatabase = state => state.nbaDatabase
export const selectMlbDatabase = state => state.mlbDatabase
export const selectNbaMeta = state => state.nbaMeta
export const selectMlbMeta = state => state.mlbMeta
export const selectDatabase = createSelector(
  selectSport,
  selectNbaDatabase,
  selectMlbDatabase,
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

export const selectMeta = createSelector(
  selectSport,
  selectNbaMeta,
  selectMlbMeta,
  (sport, nbaMeta, mlbMeta) => {
    switch (sport) {
      case NBA:
        return nbaMeta
      case MLB:
        return mlbMeta
      default:
        throw sport
    }
  }
)

export const selectSeason = createSelector(
  selectDatabase,
  selectMeta,
  (database, meta) => meta.season ? database.Season.withId(meta.season) : {}
)

export const selectSeasons = createSelector(
  selectDatabase,
  database => database.Season.all().toModelArray()
)

export const selectSeasonsFetch = createSelector(
  selectMeta,
  meta => meta.seasonsFetch
)

export const selectGames = createSelector(
  selectDatabase,
  database => database.Game.all().toModelArray()
)

export const selectGamesFetch = createSelector(
  selectMeta,
  meta => meta.gamesFetch
)
