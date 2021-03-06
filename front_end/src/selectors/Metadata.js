import { createSelector } from 'reselect'
import qs from 'query-string'

import { NBA, MLB, PERIODS } from '../const'
import orm from '../models/orm'

export const selectSport = (state) => state.sport
export const selectPeriod = (state) => state.period
export const selectPeriods = createSelector(
  selectSport,
  (sport) => PERIODS[sport]
)
export const selectQueryParams = ({ location: { search } }) => {
  return qs.parse(search)
}

export const selectNbaDatabase = state => state.nbaDatabase
export const selectMlbDatabase = state => state.mlbDatabase
export const selectNbaMetadata = state => state.nbaMetadata
export const selectMlbMetadata = state => state.mlbMetadata
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

export const selectMetadata = createSelector(
  selectSport,
  selectNbaMetadata,
  selectMlbMetadata,
  (sport, nbaMetadata, mlbMetadata) => {
    switch (sport) {
      case NBA:
        return nbaMetadata
      case MLB:
        return mlbMetadata
      default:
        throw sport
    }
  }
)

export const selectSeasonId = createSelector(
  selectMetadata,
  (metadata) => metadata.seasonId
)

export const selectGameId = createSelector(
  selectMetadata,
  meta => meta.gameId
)

export const selectSeasonsFetched = createSelector(
  selectMetadata,
  (metadata) => metadata.seasonsFetched
)

export const selectGamesFetched = createSelector(
  selectMetadata,
  meta => meta.gamesFetched
)

export const selectStatsFetched = createSelector(
  selectMetadata,
  metadata => metadata.statsFetched
)


