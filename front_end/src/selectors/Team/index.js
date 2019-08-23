import { createSelector } from 'reselect'
import { selectMeta, selectDatabase } from '../Data'
import { selectSeason } from '../Season'

export const selectTeams = createSelector(
  selectDatabase,
  selectSeason,
  (database, season) => season.teams ? season.teams.toModelArray() : []
)
