import {
  FETCHED_NBA_MATCHES,
  HOME_TEAM_INFO_FOR_NBA,
  AWAY_TEAM_INFO_FOR_NBA,
  NBA_GAME_DATA,
  NBA_ARTICLES,
  ERROR_IN_SENDING_REQUEST,
  FETCHING_NBA_SCORES,
  CLEAR_ERROR_MESSAGE_FOR_NBA,
  ERROR_IN_FETCHING_NBA_NEWS,
  No_NBA_MATCHES,
  LIVE_NBA_GAMES_INFO,
  FETCHED_TEAM_SCORES,
  FETCHED_LIVE_MATCHES_AND_SCORES,
} from '../actions/types';

const INITIAL_STATE = {
  NBAGames: [],
  homeTeam: [],
  awayTeam: [],
  gameData: {},
  nbaArticles: [],
  liveNBAMatches: [],
  error: '',
  loading: false,
  newsError: '',
  teamScores: {},
  liveTeamScore: {},
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_NBA_SCORES:
     return { ...state, loading: true }
    case FETCHED_NBA_MATCHES:
     return { ...state, NBAGames: action.payload, loading: false }
    case HOME_TEAM_INFO_FOR_NBA:
    // console.log(action.payload)
     return { ...state, homeTeam: action.payload }
    case AWAY_TEAM_INFO_FOR_NBA:
     return { ...state, awayTeam: action.payload}
    case NBA_GAME_DATA:
     return { ...state, gameData: action.payload }
    case NBA_ARTICLES:
     return {...state, nbaArticles: action.payload }
    case ERROR_IN_SENDING_REQUEST:
     return { ...state, error: 'something went wrong', loading: false}
    case CLEAR_ERROR_MESSAGE_FOR_NBA:
     return { ...state, error: '', newsError: '' }
    case ERROR_IN_FETCHING_NBA_NEWS:
     return { ...state, newsError: 'something went wrong' }
    case No_NBA_MATCHES:
     return { ...state, loading: false, NBAGames: [] }
    case LIVE_NBA_GAMES_INFO:
     return { ...state, loading: false, liveNBAMatches: action.payload }
    case FETCHED_TEAM_SCORES:
     // console.log(action.payload, 'payload')
     return { ...state, teamScores: action.payload}
    case FETCHED_LIVE_MATCHES_AND_SCORES:
    console.log(action.payload, 'payload')
     return { ...state, liveTeamScore: action.payload}
    default:
     return state
  }
}
