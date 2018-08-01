import axios from 'axios';
import {
  FETCHED_NBA_MATCHES,
  HOME_TEAM_INFO_FOR_NBA,
  AWAY_TEAM_INFO_FOR_NBA,
  NBA_GAME_DATA,
  NBA_ARTICLES
} from './types';

import moment from 'moment';

export const renderNBAMatches = () => async dispatch => {
  const API_KEY = 'vnvs88e983qs7v4r9ffq88xn'
  const date = '2018/02/01'
  const TodaysDate = moment().format('YYYY/MM/DD')
  const url = `http://api.sportradar.us/nba/trial/v5/en/games/${date}/schedule.json?api_key=${API_KEY}`
  axios.get(url)
   .then(res => {
     const matches = res.data.games
     // console.log(game)
     dispatch({ type: FETCHED_NBA_MATCHES, payload: matches })
   })
}

export const showMatchDetails = (game, callback) => async dispatch => {
  const API_KEY = 'vnvs88e983qs7v4r9ffq88xn'
  const gameId = game.id
  dispatch({ type: NBA_GAME_DATA, payload: game  })
  const url2 = `http://api.sportradar.us/nba/trial/v5/en/games/${gameId}/summary.json?api_key=${API_KEY}`
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
  const NEWS_API_KEY = 'f654a5a963d34b4eba103c5948c43fd5'
  const url  = `https://newsapi.org/v2/top-headlines?sources=bbc-sport&q=Wayne&apiKey=${NEWS_API_KEY}`
  const lang = 'en'
  const startingDate = moment().add(-1, 'days').format('YYYY-MM-DD')
  const endDate = moment().format('YYYY-MM-DD')
  const url2 = `https://newsapi.org/v2/everything?language=en&q=NBA&page=1&from=${startingDate}&to=${endDate}&sortBy=popularity&apiKey=${NEWS_API_KEY}`
  // const url3 = `https://newsapi.org/v2/everything?q=farah-najjar&apiKey=${NEWS_API_KEY}`
  axios.get(url2)
   .then((res) => {
        const articles = res.data.articles
        dispatch({ type: NBA_ARTICLES, payload: articles })
   })
}
