import { createSelector } from 'reselect'
import { selectMeta } from '../Data'

export const selectStatsFetched = createSelector(
  selectMeta,
  (meta) => meta.statsFetched
)
