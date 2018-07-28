import { FETCHED_NBA_MATCHES } from '../actions/types';

const INITIAL_STATE = {
  NBAGames: [],
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_NBA_MATCHES:
    // console.log(action.payload)
     return { ...state, NBAGames: action.payload }
    default:
     return state
  }
}
