import { FETCHED_FOOTBALL_MATCHES } from '../actions/types'

const INITIAL_STATE = {
  footballGames: []
}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_FOOTBALL_MATCHES:
    // console.log(action.payload)
     return {...state, footballGames: action.payload}
    default:
    return state;
  }
}
