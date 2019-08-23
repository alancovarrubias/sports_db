import { createSelector } from 'reselect'
import { selectDatabase, selectMeta } from './Data'
import { selectSeason } from './Season'
import { GAME_HEADERS, GAME_KEYS } from '../const'

export const selectGame = createSelector(
  selectDatabase,
  selectMeta,
  (database, meta) => database.Game.withId(meta.gameId) ? database.Game.withId(meta.gameId) : {}
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

export const selectGameHeaders = createSelector(
  () => GAME_HEADERS
)

export const selectGameKeys = createSelector(
  () => GAME_KEYS
)

export const selectGamesFetched = createSelector(
  selectMeta,
  (meta) => meta.gamesFetched
)

export const selectGameId = createSelector(
  selectMeta,
  (meta) => meta.gameId
)

