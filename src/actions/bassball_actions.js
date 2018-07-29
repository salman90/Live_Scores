import moment from 'moment';
import axios from 'axios';
import { FETCHED_BASSBALL_MATCHES } from './types'


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
