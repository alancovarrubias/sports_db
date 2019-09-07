import qs from 'query-string'
import { push } from 'connected-react-router'

const override = (props, overrides={}) => {
  const { location: { pathname } } = props
  const search = qs.stringify(overrides)
  return push({ pathname, search: `?${search}` })
}

const seasons = (props, overrides={}) => {
  return push(`/seasons`)
}
const games = (props, overrides={}) => {
  const { match: { params } } = props
  const seasonId = overrides.seasonId || params.seasonId
  return push(`/seasons/${seasonId}/games`)
}
const stats = (props, overrides={}) =>  {
  const { match: { params } } = props
  const seasonId = overrides.seasonId || params.seasonId
  const gameId = overrides.gameId || params.gameId
  return push(`/seasons/${seasonId}/games/${gameId}`)
}

export default {
  override,
  seasons,
  games,
  stats,
}
