import { combineReducers } from 'redux';
import nbaReducer from './nba';
import mlbReducer from './mlb';
import { NBA, MLB } from '../const/sports';
import { TOGGLE_SPORT } from '../actions';

const sport = (state = NBA, action) => {
  switch (action.type) {
    case TOGGLE_SPORT:
      return action.sport;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  [NBA]: nbaReducer,
  [MLB]: mlbReducer,
  sport,
});

export default rootReducer;
