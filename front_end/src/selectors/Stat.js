import { createSelector } from 'reselect'
import { STAT_HEADERS, STAT_KEYS } from '../const'
import { selectMeta, selectSport } from './Data'
import { selectGame } from './Game'
import { selectAwayTeam, selectHomeTeam } from './Team'

export const selectAwayStats = createSelector(
  selectGame,
  selectAwayTeam,
  (game, away_team) => []
)

export const selectHomeStats = createSelector(
  selectGame,
  selectHomeTeam,
  (game, away_team) => []
)

export const selectStatHeaders = createSelector(
  selectSport,
  (sport) => STAT_HEADERS[sport]
)

export const selectStatKeys = createSelector(
  selectSport,
  (sport) => STAT_KEYS[sport]
)

export const selectStatsFetched = createSelector(
  selectMeta,
  (meta) => meta.statsFetched
)
