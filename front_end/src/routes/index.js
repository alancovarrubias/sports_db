import qs from 'query-string'

export const changeQueryParams = (props, overrides={}) => {
  const { location: { pathname } } = props
  const search = qs.stringify(overrides)
  return { pathname, search: `?${search}` }
}

export const seasonsRoute = (props, overrides={}) => {
  return '/seasons'
}

export const gamesRoute = (props, overrides={}) => {
  const { match: { params } } = props
  const seasonId = overrides.seasonId || params.seasonId
  return `/seasons/${seasonId}/games`
}

export const statsRoute = (props, overrides={}) =>  {
  const { match: { params } } = props
  const seasonId = overrides.seasonId || params.seasonId
  const gameId = overrides.gameId || params.gameId
  return `/seasons/${seasonId}/games/${gameId}`
}
