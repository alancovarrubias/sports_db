import { ORM } from 'redux-orm'
import Season from './Season'

const orm = new ORM()
orm.register(Season)
export default orm

