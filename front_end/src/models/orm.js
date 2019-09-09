import { ORM } from 'redux-orm'
import Season from './Season'
import Team from './Team'
import Player from './Player'
import Game from './Game'
import Stat from './Stat'

const Orm = new ORM()
Orm.register(Season, Team, Player, Game, Stat)
export default Orm

