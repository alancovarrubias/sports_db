import { createSelector } from 'reselect'
import { selectSeason } from './Season'
import { selectGame } from './Game'

export const selectTeams = createSelector(
  selectSeason,
  (season) => season.teams ? season.teams.toModelArray() : []
)
export const selectAwayTeam = createSelector(
  selectGame,
  (game) => game.away_team ? game.away_team : {}
)
export const selectHomeTeam = createSelector(
  selectGame,
  (game) => game.home_team ? game.home_team : {}
)
