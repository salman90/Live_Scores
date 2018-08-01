import {
  FETCHED_BASSBALL_MATCHES,
  MLB_ARTICLES,
  BASSBALL_MATCH_DETAILS,
  SCORING_RESULTS_FOR_HOME_TEAM,
  SCORING_RESULTS_FOR_AWAY_TEAM
} from '../actions/types'

const INITIAL_STATE = {
  bassballGames: [],
  MLBNews: [],
  bassballMatchDetails: {},
  homeTeamScores: [],
  awayTeamScores: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_BASSBALL_MATCHES:
     return { ...state ,bassballGames: action.payload }
    case MLB_ARTICLES:
     // console.log(action.payload)
     return { ...state, MLBNews: action.payload}
    case BASSBALL_MATCH_DETAILS:
     return { ...state, bassballMatchDetails: action.payload }
    case SCORING_RESULTS_FOR_HOME_TEAM:
     return { ...state, homeTeamScores: action.payload}
    case SCORING_RESULTS_FOR_AWAY_TEAM:
     return { ...state, awayTeamScores: action.payload}
    default:
    return state;
  }
}
