import { createSelector } from 'reselect'
import * as _ from 'lodash'
import { selectDatabase, selectMetadata } from './Metadata'
import { SEASON_KEYS, SEASON_HEADERS } from '../const'

export const selectSeason = createSelector(
  selectDatabase,
  selectMetadata,
  (database, metadata) => database.Season.withId(metadata.seasonId) ? database.Season.withId(metadata.seasonId) : {}
)

export const selectSeasons = createSelector(
  selectDatabase,
  database => _.sortBy(database.Season.all().toModelArray(), ['year']).reverse()
)

export const selectSeasonsFetched = createSelector(
  selectMetadata,
  (metadata) => metadata.seasonsFetched
)

export const selectSeasonId = createSelector(
  selectMetadata,
  (metadata) => metadata.seasonId
)

export const selectSeasonHeaders = createSelector(
  () => SEASON_HEADERS
)

export const selectSeasonKeys = createSelector(
  () => SEASON_KEYS
)
