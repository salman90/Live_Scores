import {
  FETCHED_NBA_MATCHES,
  HOME_TEAM_INFO_FOR_NBA,
  AWAY_TEAM_INFO_FOR_NBA,
  NBA_GAME_DATA,
  NBA_ARTICLES,
  ERROR_IN_SENDING_REQUEST,
  FETCHING_NBA_SCORES,
  CLEAR_ERROR_MESSAGE_FOR_NBA,
} from '../actions/types';

const INITIAL_STATE = {
  NBAGames: [],
  homeTeam: [],
  awayTeam: [],
  gameData: {},
  nbaArticles: [],
  error: '',
  loading: false,
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_NBA_SCORES:
     return { ...state, loading: true }
    case FETCHED_NBA_MATCHES:
    // console.log(action.payload)
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
     return { ...state, error: '' }
    default:
     return state
  }
}
