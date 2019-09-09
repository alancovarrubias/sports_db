import { createSelector } from 'reselect'
import * as _ from 'lodash'

import { GAME_HEADERS, GAME_KEYS } from '../const'
import { selectDatabase, selectMetadata } from './Metadata'
import { selectSeason } from './Season'

export const selectGame = createSelector(
  selectDatabase,
  selectMetadata,
  (database, metadata) => database.Game.withId(metadata.gameId) ? database.Game.withId(metadata.gameId) : {}
)

export const selectGames = createSelector(
  selectDatabase,
  selectSeason,
  (database, season) => season.id ? _.sortBy(season.games.toModelArray().map(game => ({
    ...game.ref,
    away_team: game.away_team.ref,
    home_team: game.home_team.ref,
  })), ['date']) : []
)

export const selectGameHeaders = createSelector(
  () => GAME_HEADERS
)

export const selectGameKeys = createSelector(
  () => GAME_KEYS
)

