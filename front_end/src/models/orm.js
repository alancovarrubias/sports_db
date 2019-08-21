import { ORM } from 'redux-orm'
import Season from './Season'
import Team from './Team'
import Player from './Player'
import Game from './Game'
import Stat from './Stat'
import Bet from './Bet'
import Line from './Line'

const orm = new ORM()
orm.register(Season, Team, Player, Game, Stat, Bet, Line)
export default orm

