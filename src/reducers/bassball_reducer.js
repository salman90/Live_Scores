import { FETCHED_BASSBALL_MATCHES, MLB_ARTICLES } from '../actions/types'

const INITIAL_STATE = {
  bassballGames: [],
  MLBNews: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_BASSBALL_MATCHES:
     return { ...state ,bassballGames: action.payload }
    case MLB_ARTICLES:
     // console.log(action.payload)
     return { ...state, MLBNews: action.payload}
    default:
    return state;
  }
}
