import axios from 'axios';
import { FETCHED_NBA_MATCHES } from './types';
import moment from 'moment';

export const renderNBAMatches = () => async dispatch => {
  const API_KEY = 'vnvs88e983qs7v4r9ffq88xn'
  const date = '2018/02/01'
  const TodaysDate = moment().format('YYYY/MM/DD')
  const url = `http://api.sportradar.us/nba/trial/v5/en/games/${date}/schedule.json?api_key=${API_KEY}`
  axios.get(url)
   .then(res => {
     const matches = res.data.games
     dispatch({ type: FETCHED_NBA_MATCHES, payload: matches })
   })
}
