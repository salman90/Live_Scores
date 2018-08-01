import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';
import {
  FETCHED_BASSBALL_MATCHES,
  MLB_ARTICLES,
  BASSBALL_MATCH_DETAILS,
  SCORING_RESULTS_FOR_HOME_TEAM,
  SCORING_RESULTS_FOR_AWAY_TEAM,
} from './types'


export const getTodaysMatches = (date) => async dispatch => {
  // console.log('in function')
  // const date = '2018/07/27'
  const API_KEY = '8uevyeqyb38gms9t8qmbtj5w'
  const url  = `http://api.sportradar.us/mlb/trial/v6.5/en/games/${date}/boxscore.json?api_key=${API_KEY}`
  axios.get(url)
   .then( res => {
     const games = res.data.league.games
     dispatch({ type: FETCHED_BASSBALL_MATCHES, payload: games })
   })
}

export const getMachInfo = (game, callback) => async dispatch => {
  const gameId = game.game.id
  dispatch({ type: BASSBALL_MATCH_DETAILS, payload: game })

  const awayTeamInfo = game.game.away
  const awayAbbr = awayTeamInfo.abbr
  const homeTeamInfo = game.game.home
  const homeAbbr =  homeTeamInfo.abbr

  const awayScoringTeam = awayTeamInfo.scoring
  if (typeof awayScoringTeam !==  'undefined') {

    const awayScoringTeam = awayTeamInfo.scoring
    const homeScoringTeam = homeTeamInfo.scoring
    let awayRuns = []
    awayRuns.push(awayAbbr)
    awayScoringTeam.map((score, i) => {
      let runs = score.runs
      awayRuns.push(runs)
    })

    let awayTotalCountOfErrors = _.sumBy(['errors'], _.partial(_.sumBy, awayScoringTeam));
    let awayTotalCountOfHits  = _.sumBy(['hits'], _.partial(_.sumBy, awayScoringTeam));
    let awayTotalCountOfRuns  = _.sumBy(['runs'], _.partial(_.sumBy, awayScoringTeam));

    awayRuns.push(awayTotalCountOfRuns, awayTotalCountOfErrors, awayTotalCountOfHits )

    dispatch({ type: SCORING_RESULTS_FOR_AWAY_TEAM, payload: awayRuns })

    let homeRuns = []
    let totalRuns = 0
    homeRuns.push(homeAbbr)
    homeScoringTeam.map((score, i) => {
      let runs = score.runs
      homeRuns.push(runs)
    })

    let homeTotalCountOfErrors = _.sumBy(['errors'], _.partial(_.sumBy, homeScoringTeam));
    let homeTotalCountOfHits  = _.sumBy(['hits'], _.partial(_.sumBy, homeScoringTeam));
    let homeTotalCountOfRuns  = _.sumBy(['runs'], _.partial(_.sumBy, homeScoringTeam));

    homeRuns.push(homeTotalCountOfRuns, homeTotalCountOfHits, homeTotalCountOfErrors)
    dispatch({ type: SCORING_RESULTS_FOR_HOME_TEAM, payload: homeRuns  })

  }

  // console.log(homeRuns, 'home runs')
  callback()
}

export const getBassballNews = () => async dispatch => {
  const NEWS_API_KEY = 'f654a5a963d34b4eba103c5948c43fd5'
  const lang = 'en'
  const startingDate = moment().add(-1, 'days').format('YYYY-MM-DD')
  const endDate = moment().format('YYYY-MM-DD')
  const URL =`https://newsapi.org/v2/everything?language=en&q=MLB&page=1&from=${startingDate}&to=${endDate}&sortBy=popularity&apiKey=${NEWS_API_KEY}`
    axios.get(URL)
     .then((res) => {
       const articles = res.data.articles
       dispatch({ type: MLB_ARTICLES, payload: articles })
     })
}
