import { FETCHED_FOOTBALL_MATCHES, GAME_INFO_FOOTBALL, FETCHED_FOOTBALL_ARTICLES } from '../actions/types'

const INITIAL_STATE = {
  footballGames: [],
  gameInfo: {},
  footballArticles: [],
}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_FOOTBALL_MATCHES:
     return {...state, footballGames: action.payload}
    case GAME_INFO_FOOTBALL:
     return { ...state, gameInfo: action.payload }
    case FETCHED_FOOTBALL_ARTICLES:
     // console.log(action.payload)
     return { ...state, footballArticles: action.payload}
    default:
    return state;
  }
}
