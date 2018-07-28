import { FETCHED_BASSBALL_MATCHES } from '../actions/types'

const INITIAL_STATE = {
  bassballGames: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_BASSBALL_MATCHES:
     return { ...state ,bassballGames: action.payload }
    default:
    return state;
  }
}
