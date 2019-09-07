import { createSelector } from 'reselect'
import { NBA, MLB, SPORTS, PERIODS } from '../const'
import orm from '../models/orm'

export const selectSport = (state) => state.sport
export const selectPeriod = (state) => state.period
export const selectRange = (state) => state.range
export const selectPeriods = createSelector(
  selectSport,
  (sport) => PERIODS[sport]
)
export const selectSportsDropdown = (state) => ({
  title: "Sports",
  links: SPORTS.map((sport, index) => ({
    id: index,
    text: sport,
    data: sport,
  })),
})

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

