import {
  FETCHED_NBA_MATCHES,
  HOME_TEAM_INFO_FOR_NBA,
  AWAY_TEAM_INFO_FOR_NBA,
  NBA_GAME_DATA,
  NBA_ARTICLES
} from '../actions/types';

const INITIAL_STATE = {
  NBAGames: [],
  homeTeam: [],
  awayTeam: [],
  gameData: {},
  nbaArticles: [],
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_NBA_MATCHES:
    // console.log(action.payload)
     return { ...state, NBAGames: action.payload }
    case HOME_TEAM_INFO_FOR_NBA:
    // console.log(action.payload)
     return { ...state, homeTeam: action.payload }
    case AWAY_TEAM_INFO_FOR_NBA:
     return { ...state, awayTeam: action.payload}
    case NBA_GAME_DATA:
     return { ...state, gameData: action.payload }
    case NBA_ARTICLES:
     return {...state, nbaArticles: action.payload }
    default:
     return state
  }
}
