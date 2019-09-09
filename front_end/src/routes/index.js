import qs from 'query-string'
import * as _ from 'lodash'
import { QUERY_PARAMS } from '../const'

const getPathname = (route, props, overrides) => {
  const { location: { pathname }, match: { params } } = props
  const seasonId = overrides.seasonId || params.seasonId
  const gameId = overrides.gameId || params.gameId
  const pathnameMap = {
    changeQueryParams: pathname,
    seasons: '/seasons',
    games: `/seasons/${seasonId}/games`,
    stats: `/seasons/${seasonId}/games/${gameId}`,
  }
  return pathnameMap[route]
}

const overrideSearch = (props, overrides) => {
  const { location: { search } } = props
  const prevSearch = qs.parse(search)
  const searchOverrides = _.pickBy(overrides, (value, key) => QUERY_PARAMS.includes(key))
  const newSearch = { ...prevSearch, ...searchOverrides }
  return qs.stringify(newSearch)
}

export const changeQueryParams = (props, overrides={}) => {
  return {
    pathname: getPathname('changeQueryParams', props, overrides),
    search: overrideSearch(props, overrides),
  }
}

export const seasonsRoute = (props, overrides={}) => {
  return {
    pathname: getPathname('seasons', props, overrides),
    search: overrideSearch(props, overrides),
  }
}

export const gamesRoute = (props, overrides={}) => {
  return {
    pathname: getPathname('games', props, overrides),
    search: overrideSearch(props, overrides),
  }
}

export const statsRoute = (props, overrides={}) =>  {
  return {
    pathname: getPathname('stats', props, overrides),
    search: overrideSearch(props, overrides),
  }
}
