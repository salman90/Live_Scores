import { FETCHED_FOOTBALL_MATCHES, GAME_INFO_FOOTBALL } from '../actions/types'

const INITIAL_STATE = {
  footballGames: [],
  gameInfo: {}
}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_FOOTBALL_MATCHES:
     return {...state, footballGames: action.payload}
    case GAME_INFO_FOOTBALL:
     return { ...state, gameInfo: action.payload }
    default:
    return state;
  }
}
