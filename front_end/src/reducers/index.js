import { combineReducers } from 'redux'
import { TOGGLE_SPORT } from '../actions'
import { NBA, MLB } from '../const/sports'
import { namespaceReducerFactory } from '../helpers/namespaceModule'
import ormReducer from './ormReducer'

const sport = (state = '', action) => {
  switch (action.type) {
    case TOGGLE_SPORT:
      console.log(action)
      return action.sport
    default:
      return state
  }
}

const nbaDatabase = namespaceReducerFactory(NBA)(ormReducer)
const mlbDatabase = namespaceReducerFactory(MLB)(ormReducer)

const rootReducer = combineReducers({
  sport,
  nbaDatabase,
  mlbDatabase,
})

export default rootReducer
