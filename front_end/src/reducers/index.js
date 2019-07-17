import { combineReducers } from 'redux';
import databaseReducer from './database';
import { namespaceReducerFactory } from '../helpers/namespace-module';
import { NBA, MLB, DEFAULT_SPORT } from '../const/sports';
import { TOGGLE_SPORT } from '../actions';

const sport = (state = DEFAULT_SPORT, action) => {
  switch (action.type) {
    case TOGGLE_SPORT:
      return action.sport;
    default:
      return state;
  }
}

const mlbReducer = namespaceReducerFactory(MLB)(databaseReducer);
const nbaReducer = namespaceReducerFactory(NBA)(databaseReducer);

const rootReducer = combineReducers({
  [NBA]: nbaReducer,
  [MLB]: mlbReducer,
  sport,
});

export default rootReducer;
