import { NBA, MLB } from './Sport'

export const STAT_HEADERS = {
  [NBA]: [
    { width: '16%', text: 'Name' },
    'MP',
    'FGM',
    'FGA',
    'THPM',
    'THPA',
    'FTM',
    'FTA',
    'ORB',
    'DRB',
    'AST',
    'STL',
    'BLK',
    'TOV',
    'PF',
    'PTS',
    'ORTG',
    'DRTG',
  ],
  [MLB]: [
    'Name',
  ],
}
export const STAT_KEYS = {
  [NBA]: [
    'player.name',
    'sp',
    'fgm',
    'fga',
    'thpm',
    'thpa',
    'ftm',
    'fta',
    'orb',
    'drb',
    'ast',
    'stl',
    'blk',
    'tov',
    'pf',
    'pts',
    'ortg',
    'drtg',
  ],
  [MLB]: [
    'player.name',
  ],
}
