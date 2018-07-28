import moment from 'moment';
import axios from 'axios';
import { FETCHED_BASSBALL_MATCHES } from './types'


export const getTodaysMatches = () => async dispatch => {
  const TodaysDate = moment().format('YYYY/MM/DD')
  const API_KEY = '8uevyeqyb38gms9t8qmbtj5w'
  const url  = `http://api.sportradar.us/mlb/trial/v6.5/en/games/${TodaysDate}/boxscore.json?api_key=${API_KEY}`
  axios.get(url)
   .then( res => {
     const games = res.data.league.games
     dispatch({ type: FETCHED_BASSBALL_MATCHES, payload: games })
   })
}
