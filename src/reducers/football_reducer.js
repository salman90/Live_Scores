import {
  FETCHED_FOOTBALL_MATCHES,
  GAME_INFO_FOOTBALL,
  FETCHED_FOOTBALL_ARTICLES,
  FOOTBALL_MATCH_DETAILS,
  FETCHING_FOOTBALL_SCORES,
  ERROR_IN_FETCHING_FOOTBALL_SCORES,
  CLEAR_ERROR_MESSAGE_FOR_FOOTBALL_SCORES,
  ERROR_IN_FETCHING_FOOTBALL_NEWS
} from '../actions/types'

const INITIAL_STATE = {
  footballGames: [],
  gameInfo: {},
  footballArticles: [],
  loading: false,
  error: '',
  newsError: ''
}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_FOOTBALL_MATCHES:
     return {...state, footballGames: action.payload, loading: false}
    case GAME_INFO_FOOTBALL:
     return { ...state, gameInfo: action.payload }
    case FETCHED_FOOTBALL_ARTICLES:
     // console.log(action.payload)
     return { ...state, footballArticles: action.payload}
    case FOOTBALL_MATCH_DETAILS:
     return { ...state, footballMatchDetails: action.payload}
    case FETCHING_FOOTBALL_SCORES:
     return { ...state, loading: true}
    case ERROR_IN_FETCHING_FOOTBALL_SCORES:
     return { ...state, error: 'somthing went wrong', loading: false }
    case CLEAR_ERROR_MESSAGE_FOR_FOOTBALL_SCORES:
     return { ...state, error: '', newsError: ''}
    case ERROR_IN_FETCHING_FOOTBALL_NEWS:
     return { ...state, newsError: 'something went wrong'}
    default:
    return state;
  }
}
