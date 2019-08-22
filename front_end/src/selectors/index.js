import { createSelector } from 'reselect'
import * as _ from 'lodash'
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
  (database, meta) => database.Season.withId(meta.seasonId) ? database.Season.withId(meta.seasonId) : {}
)

export const selectSeasons = createSelector(
  selectDatabase,
  database => _.sortBy(database.Season.all().toModelArray(), ['year']).reverse()
)


export const selectGames = createSelector(
  selectDatabase,
  selectSeason,
  (database, season) => season.id ? season.games.toModelArray().map(game => ({
    ...game.ref,
    away_team: game.away_team.ref,
    home_team: game.home_team.ref,
  })) : []
)

export const selectGame = createSelector(
  selectDatabase,
  selectMeta,
  (database, meta) => database.Game.withId(meta.gameId) ? database.Game.withId(meta.gameId) : {}
)

export const selectSeasonsFetched = createSelector(
  selectMeta,
  meta => meta.seasonsFetched
)

export const selectGamesFetched = createSelector(
  selectMeta,
  meta => meta.gamesFetched
)

export const selectStatsFetched = createSelector(
  selectMeta,
  meta => meta.statsFetched
)

export const selectTeams = createSelector(
  selectDatabase,
  selectSeason,
  (database, season) => season.teams ? season.teams.toModelArray() : []
)

