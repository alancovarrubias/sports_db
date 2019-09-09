import { createSelector } from 'reselect'
import { STAT_HEADERS, STAT_KEYS } from '../const'
import { selectMetadata, selectSport, selectPeriod } from './Metadata'
import { selectGame } from './Game'
import { selectAwayTeam, selectHomeTeam } from './Team'

const selectTeamStats = (game, team, period) => game.stats ? game.stats.toModelArray().filter(
  stat => stat.player.team_id === team.id && stat.period === period
).map(stat => ({
  ...stat.ref,
  player: stat.player.ref,
})) : []

export const selectAwayStats = createSelector(
  selectGame,
  selectAwayTeam,
  selectPeriod,
  selectTeamStats
)

export const selectHomeStats = createSelector(
  selectGame,
  selectHomeTeam,
  selectPeriod,
  selectTeamStats
)

export const selectStatHeaders = createSelector(
  selectSport,
  sport => STAT_HEADERS[sport]
)

export const selectStatKeys = createSelector(
  selectSport,
  sport => STAT_KEYS[sport]
)

export const selectStatsFetched = createSelector(
  selectMetadata,
  metadata => metadata.statsFetched
)
