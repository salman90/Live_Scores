import {
  FETCHED_BASSBALL_MATCHES,
  MLB_ARTICLES,
  BASSBALL_MATCH_DETAILS,
  SCORING_RESULTS_FOR_HOME_TEAM,
  SCORING_RESULTS_FOR_AWAY_TEAM,
  ERROR_IN_FETCHING_BASSBALL_SCORES,
  FETCHING_BASSBALL_SCORES,
  CLEAR_ERROR_MESSAGE_FOR_BASSBALL_SCORES,
  ERROR_IN_FETCHING_BASSBALL_NEWS,
  NO_GAMES_THAT_DAY,
  LIVE_MATCH_DETAILS_FOR_BASSBALL,
  NO_BASSBALL_MATCHES,
  FETCHED_LIVE_BASSBALL_MATCHES,
} from '../actions/types'

const INITIAL_STATE = {
  bassballGames: [],
  MLBNews: [],
  bassballMatchDetails: {},
  homeTeamScores: [],
  awayTeamScores: [],
  error: '',
  loading: false,
  NewsError: '',
  liveBassballMatchDetails: {},
  liveMatchesArr: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_BASSBALL_MATCHES:
     return { ...state ,bassballGames: action.payload, loading: false }
    case NO_BASSBALL_MATCHES:
     return { ...state, bassballGames: [], loading: false }
    case MLB_ARTICLES:
     return { ...state, MLBNews: action.payload}
    case BASSBALL_MATCH_DETAILS:
     return { ...state, bassballMatchDetails: action.payload }
    case SCORING_RESULTS_FOR_HOME_TEAM:
     return { ...state, homeTeamScores: action.payload}
    case SCORING_RESULTS_FOR_AWAY_TEAM:
     return { ...state, awayTeamScores: action.payload}
    case ERROR_IN_FETCHING_BASSBALL_SCORES:
     return { ...state, error: 'somthing went wrong', loading: false}
    case FETCHING_BASSBALL_SCORES:
     return { ...state, loading: true }
    case CLEAR_ERROR_MESSAGE_FOR_BASSBALL_SCORES:
     return { ...state, error: '', NewsError: '' }
    case ERROR_IN_FETCHING_BASSBALL_NEWS:
     return { ...state, NewsError: 'something went wrong'}
    case NO_GAMES_THAT_DAY:
     return { ...state, bassballGames: [], loading: false }
    case LIVE_MATCH_DETAILS_FOR_BASSBALL:
     return { ...state, liveBassballMatchDetails: action.payload }
    case FETCHED_LIVE_BASSBALL_MATCHES:
     return { ...state, liveMatchesArr: action.payload}
    default:
    return state;
  }
}
