import moment from 'moment';
import axios from 'axios';
import { FETCHED_BASSBALL_MATCHES, MLB_ARTICLES } from './types'


export const getTodaysMatches = () => async dispatch => {
  const TodaysDate = moment().format('YYYY/MM/DD')
  const date = '2018/07/27'
  const API_KEY = '8uevyeqyb38gms9t8qmbtj5w'
  const url  = `http://api.sportradar.us/mlb/trial/v6.5/en/games/${TodaysDate}/boxscore.json?api_key=${API_KEY}`
  axios.get(url)
   .then( res => {
     const games = res.data.league.games
     dispatch({ type: FETCHED_BASSBALL_MATCHES, payload: games })
   })
}

export const getMachInfo = (game, callback) => async dispatch => {
  console.log(game)
  const gameId = game.game.id
  // const API_KEY = '8uevyeqyb38gms9t8qmbtj5w'
  // const url = `http://api.sportradar.us/mlb/trial/v6.5/en/games/${gameId}/summary.json?api_key=${API_KEY}`
  // axios.get(url)
  //  .then((res) => {
  //    console.log(res.data)
  //  })
  // callback()
}

export const getBassballNews = () => async dispatch => {
  const NEWS_API_KEY = 'f654a5a963d34b4eba103c5948c43fd5'
  const lang = 'en'
  const startingDate = '2018-07-28'
  const endDate = moment().format('YYYY/MM/DD')
  const URL =`https://newsapi.org/v2/everything?language=en&q=MLB&page=1&from=${startingDate}&to=${endDate}&sortBy=popularity&apiKey=${NEWS_API_KEY}`
    axios.get(URL)
     .then((res) => {
       const articles = res.data.articles
       dispatch({ type: MLB_ARTICLES, payload: articles })
     })
}
