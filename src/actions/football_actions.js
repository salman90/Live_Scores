import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';
import { FOOTBALL_API_KEY, FOOTBALL_NEWS_API_KEY } from 'react-native-dotenv';
import {
  FETCHED_FOOTBALL_MATCHES,
  GAME_INFO_FOOTBALL,
  FETCHED_FOOTBALL_ARTICLES,
  FOOTBALL_MATCH_DETAILS,
  FETCHING_FOOTBALL_SCORES,
  CLEAR_ERROR_MESSAGE_FOR_FOOTBALL_SCORES,
  ERROR_IN_FETCHING_FOOTBALL_SCORES,
  ERROR_IN_FETCHING_FOOTBALL_NEWS,
  FECHING_LIVE_SCORES_IN_FOOTBALL,
  LIVE_MATCH_DETAILS,
  NO_LIVE_MATCHES_ERROR,
  FETCHED_LIVE_SCORES_IN_FOOTBALL_SUCCESSFULLY,
  ERROR_FETCHING_LIVE_MATCHES,
  NO_FOOTBALL_MATCHES_IN_THAT_DATE,
  FECHING_FOOTBALL_MATCH_DETAILS,
 } from './types'

 export const getTodaysMatchesForFootball = (date) => async dispatch => {

   dispatch({ type: FETCHING_FOOTBALL_SCORES })
   const TodaysDate = moment().format('YYYY/MM/DD')
   const url = `https://api.sportradar.us/soccer-xt3/eu/en/schedules/${date}/schedule.json?api_key=${FOOTBALL_API_KEY}`

  // const url = `https://api.sportradar.us/soccer-xt3/eu/en/schedules/${date}/schedule.json?api_key=a4nbj7zwu8r7dzgeaw8yr23t`

   axios.get(url)
    .then(res => {
      const results = res.data
      const footballEvent  = results.sport_events
      console.log(footballEvent, 'football event')

      dispatch({ type: FETCHED_FOOTBALL_MATCHES, payload: footballEvent })
      return  footballEvent
    })
   .catch((error) => {
     console.log(error)
     // if(error.response.status === 404){

       dispatch({ type: NO_FOOTBALL_MATCHES_IN_THAT_DATE })
     // }else {
       // dispatch({ type: ERROR_IN_FETCHING_FOOTBALL_SCORES })
     // }
   })
}

export const getMatchDetails = (game,callback) => async dispatch => {
  dispatch({ type: FECHING_FOOTBALL_MATCH_DETAILS })
  const gameUid = game.id

  const url = `https://api.sportradar.us/soccer-xt3/eu/en/matches/${gameUid}/summary.json?api_key=${FOOTBALL_API_KEY}`
  axios.get(url)
   .then((res) => {
     let matchEvent =  res.data
     console.log(matchEvent)
     dispatch({ type: FOOTBALL_MATCH_DETAILS, payload: matchEvent })
   })

  callback()
}


export const getFootballNews = () => async dispatch => {
  const lang = 'en'
  const endDate = moment().format('YYYY-MM-DD')
  const startingDate = moment().add(-1, 'days').format('YYYY-MM-DD')
  const URL = `https://newsapi.org/v2/everything?language=en&q=la-liga&serie-A&english-premier-league&page=1&from=${startingDate}&to=${endDate}&sortBy=popularity&apiKey=${FOOTBALL_NEWS_API_KEY}`
    axios.get(URL)
     .then((res) =>{
        const europeanFootballNews =  res.data.articles
        // europeanFootballNews.map((article, i) => {
        //   console.l
        // })
        // console.log(res.data.articles)
        // _.uniqBy(europeanFootballNews, 'title');
        console.log(europeanFootballNews)
        dispatch({ type: FETCHED_FOOTBALL_ARTICLES, payload: europeanFootballNews })
     })
     .catch((error) => {
       dispatch({ type: ERROR_IN_FETCHING_FOOTBALL_NEWS })
     })
}

export const clearErrorInFootball = () => async dispatch => {
  dispatch({ type: CLEAR_ERROR_MESSAGE_FOR_FOOTBALL_SCORES })
}

export const getFootballLiveScores = () => async dispatch => {
  dispatch({ type: FECHING_LIVE_SCORES_IN_FOOTBALL })
  const URL = `https://api.sportradar.us/soccer-xt3/eu/en/schedules/live/results.json?api_key=${FOOTBALL_API_KEY}`

  axios.get(URL)
   .then((res) => {
     // console.log(res)
     const matchInfo = res.data.results
     // console.log(res.data.results)
     dispatch({ type: FETCHED_LIVE_SCORES_IN_FOOTBALL_SUCCESSFULLY, payload: matchInfo })
   })
   .catch((error) => {
     // if(error.response.status === 404){
       dispatch({ type: NO_LIVE_MATCHES_ERROR })
     // }
   })
}


export const liveMatchDetails = (game, callback) => async dispatch => {
  dispatch({ type: LIVE_MATCH_DETAILS, payload: game })
  callback()
}
