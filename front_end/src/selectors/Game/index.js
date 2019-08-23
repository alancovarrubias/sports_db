import { createSelector } from 'reselect'
import { selectDatabase, selectMeta } from '../Data'
import { selectSeason } from '../Season'

export const selectGames = createSelector(
  selectDatabase,
  selectSeason,
  (database, season) => season.id ? season.games.toModelArray().map(game => ({
    ...game.ref,
    away_team: game.away_team.ref,
    home_team: game.home_team.ref,
  })) : []
)

export const selectGameId = createSelector(
  selectMeta,
  (meta) => meta.gameId
)

export const selectGame = createSelector(
  selectDatabase,
  selectMeta,
  (database, meta) => database.Game.withId(meta.gameId) ? database.Game.withId(meta.gameId) : {}
)


export const selectGamesFetched = createSelector(
  selectMeta,
  (meta) => meta.gamesFetched
)
