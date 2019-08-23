import { createSelector } from 'reselect'
import * as _ from 'lodash'
import { selectDatabase, selectMeta } from '../Data'

export const selectSeason = createSelector(
  selectDatabase,
  selectMeta,
  (database, meta) => database.Season.withId(meta.seasonId) ? database.Season.withId(meta.seasonId) : {}
)

export const selectSeasons = createSelector(
  selectDatabase,
  database => _.sortBy(database.Season.all().toModelArray(), ['year']).reverse()
)

export const selectSeasonsFetched = createSelector(
  selectMeta,
  (meta) => meta.seasonsFetched
)

export const selectSeasonId = createSelector(
  selectMeta,
  (meta) => meta.seasonId
)

