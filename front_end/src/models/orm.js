import { ORM } from 'redux-orm'
import Season from './Season'
import Game from './Game'

const orm = new ORM()
orm.register(Season, Game)
export default orm

