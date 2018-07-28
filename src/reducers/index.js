import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BassballReducer from './bassball_reducer';
import FootballReducer from './football_reducer';
import NBAReducer from './NBA_reducer';


export default combineReducers({
  Auth: AuthReducer,
  bassball: BassballReducer,
  football: FootballReducer,
  NBA: NBAReducer,
})
