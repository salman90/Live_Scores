import axios from 'axios';
import {
  FETCHING_NBA_SCORES,
  FETCHED_NBA_MATCHES,
  HOME_TEAM_INFO_FOR_NBA,
  AWAY_TEAM_INFO_FOR_NBA,
  NBA_GAME_DATA,
  NBA_ARTICLES,
  ERROR_IN_SENDING_REQUEST,
  CLEAR_ERROR_MESSAGE_FOR_NBA,
  ERROR_IN_FETCHING_NBA_NEWS,
  No_NBA_MATCHES
} from './types';
import { NBA_API_KEY, NBA_NEWS_API_KEY } from 'react-native-dotenv';
import moment from 'moment';

export const renderNBAMatches = (date) => async dispatch => {
  dispatch({ type: FETCHING_NBA_SCORES })
  const mom = '2018/02/01'
  // console.log(date)
  // const TodaysDate = moment().format('YYYY-MM-DD')
  // console.log(date)
  const url = `http://api.sportradar.us/nba/trial/v5/en/games/${mom}/schedule.json?api_key=${NBA_API_KEY}`
  axios.get(url)
   .then(res => {
     // console.log(res.data.games)
     const matches = res.data.games
     dispatch({ type: FETCHED_NBA_MATCHES, payload: matches })
   })
   .catch((error) => {
     if(error.response.status === 404){
       dispatch({ type:  No_NBA_MATCHES })
     }
     dispatch({ type: ERROR_IN_SENDING_REQUEST, payload: error})
   })
}

export const showMatchDetails = (game, callback) => async dispatch => {
  // console.log(game)
  const gameId = game.id
  dispatch({ type: NBA_GAME_DATA, payload: game  })
  const url2 = `http://api.sportradar.us/nba/trial/v5/en/games/${gameId}/summary.json?api_key=${NBA_API_KEY}`
  axios.get(url2)
   .then(res => {
     const homeCoaches = res.data.home.coaches
     const homTeamCoache = homeCoaches[0]
      let obj = {}
     obj['coache'] = homeCoaches[0]

     const homePlayers = res.data.home.players
     // const mainArray = []
     let multiArray = new Array

       homePlayers.map((player, i) => {
         // console.log(player.points)
         multiArray[i] = new Array
           let playerName = player.full_name
           let playerPosition = player.primary_position
           let playerStat = player.statistics
           let  playerPoints =  playerStat.points
           let playerAssits = playerStat.assists
           let playerBlocks = playerStat.blocks
         multiArray[i].push(playerName, playerPoints ,playerAssits, playerBlocks)
       })
       // console.log(multiArray)
     dispatch({ type: HOME_TEAM_INFO_FOR_NBA, payload: multiArray})

     // const awayCoaches = res.data.away.coaches

     const awayPlayers = res.data.away.players

     let multiArrayAway = new Array
      awayPlayers.map((player, i) => {
        multiArrayAway[i] = new Array
        let playerName = player.full_name
        let playerPosition = player.primary_position
        let playerStat = player.statistics
        let  playerPoints =  playerStat.points
        let playerAssits = playerStat.assists
        let playerBlocks = playerStat.blocks
        multiArrayAway[i].push(playerName, playerPoints, playerAssits, playerBlocks)
      })
      dispatch({ type: AWAY_TEAM_INFO_FOR_NBA, payload: multiArrayAway })
     // console.log(players)
     callback()
   })
}


// export const showMatchDetails = (game, callback) => async dispatch => {
//   console.log(game.id)
// }


export const renderNBANews = () => async dispatch => {
  const lang = 'en'
  const startingDate = moment().add(-1, 'days').format('YYYY-MM-DD')
  const endDate = moment().format('YYYY-MM-DD')
  console.log(startingDate)
  console.log(endDate)
  const url2 = `https://newsapi.org/v2/everything?language=en&q=basketball&NBA&page=1&from=${startingDate}&to=${endDate}&sortBy=popularity&apiKey=${NBA_NEWS_API_KEY}`
  // console.log(url2)
  axios.get(url2)
   .then((res) => {
        const articles = res.data.articles
        dispatch({ type: NBA_ARTICLES, payload: articles })
   })
   .catch((error) => {
     console.log(error)
     dispatch({ type: ERROR_IN_FETCHING_NBA_NEWS })
   })
}

export const clearErrorMessageForNBA = () => async dispatch => {
  // console.log('keep it to yourself')
  dispatch({ type: CLEAR_ERROR_MESSAGE_FOR_NBA })
}
