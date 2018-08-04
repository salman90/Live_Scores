import {
  FETCHED_FOOTBALL_MATCHES,
  GAME_INFO_FOOTBALL,
  FETCHED_FOOTBALL_ARTICLES,
  FOOTBALL_MATCH_DETAILS,
  FETCHING_FOOTBALL_SCORES,
  ERROR_IN_FETCHING_FOOTBALL_SCORES,
  CLEAR_ERROR_MESSAGE_FOR_FOOTBALL_SCORES,
  ERROR_IN_FETCHING_FOOTBALL_NEWS,
  FECHING_LIVE_SCORES_IN_FOOTBALL,
  LIVE_MATCH_DETAILS,
  NO_LIVE_MATCHES_ERROR,
  FETCHED_LIVE_SCORES_IN_FOOTBALL_SUCCESSFULLY,
  NO_FOOTBALL_MATCHES_IN_THAT_DATE,
} from '../actions/types'

const INITIAL_STATE = {
  footballGames: [],
  gameInfo: {},
  footballArticles: [],
  loading: false,
  error: '',
  newsError: '',
  liveGames: [],
  liveMatch: {},
  loadingLiveMatches: false,
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
    case FETCHED_LIVE_SCORES_IN_FOOTBALL_SUCCESSFULLY:
     return { ...state, liveGames: action.payload, loadingLiveMatches: true}
    case LIVE_MATCH_DETAILS:
     return { ...state, liveMatch: action.payload }
    case NO_LIVE_MATCHES_ERROR:
     return { ...state, loadingLiveMatches: false }
    case FECHING_LIVE_SCORES_IN_FOOTBALL:
     return { ...state, loadingLiveMatches: true }
    case NO_FOOTBALL_MATCHES_IN_THAT_DATE:
     return { ...state, loading: false, footballGames: [] }
    default:
    return state;
  }
}
