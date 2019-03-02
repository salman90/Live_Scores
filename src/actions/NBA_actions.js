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
  No_NBA_MATCHES,
  LIVE_NBA_GAMES_INFO,
  FETCHED_TEAM_SCORES,
  FETCHED_LIVE_MATCHES_AND_SCORES,
} from './types';
import { NBA_API_KEY, NBA_NEWS_API_KEY } from 'react-native-dotenv';
import moment from 'moment';

export const renderNBAMatches = (date) => async dispatch => {

  dispatch({ type: FETCHING_NBA_SCORES })
  // const mom = '2018/02/01'
  // console.log(date)
  // const TodaysDate = moment().format('YYYY-MM-DD')
  // console.log(date)

  const url = `http://api.sportradar.us/nba/trial/v5/en/games/${date}/schedule.json?api_key=${NBA_API_KEY}`
  axios.get(url)
   .then(res => {
     // console.log('in response')
     // console.log(res.data)
     const matches = res.data.games

     // console.log()
     dispatch({ type: FETCHED_NBA_MATCHES, payload: matches })
   })
   .catch((error) => {
     console.log('in error object')
     // if(error.response.status === 404){
       // dispatch({ type:  No_NBA_MATCHES })
     // }
     dispatch({ type: ERROR_IN_SENDING_REQUEST, payload: error})
   })
}

export const showMatchDetails = (game, callback) => async dispatch => {
  // console.log(game)
  // console.log(game)
  const gameId = game.id
  console.log(game.status, 'status')
  // console.log(gameId, 'gameId')
  dispatch({ type: NBA_GAME_DATA, payload: game  })
  const url2 = `http://api.sportradar.us/nba/trial/v5/en/games/${gameId}/summary.json?api_key=${NBA_API_KEY}`
  axios.get(url2)
   .then(res => {
     // console.log(res, 'response from url2')
     // console.log(res.data)
     if(game.status === 'inprogress'){
       const homeTeamScore = res.data.home.points
       // console.log(homeTeamScore, 'homeTeamScore')
       const awayTeamScore  = res.data.away.points
       // console.log(awayTeamScore, 'awayTeamScore')
       let teamsScore = {
        homeTeamScore: homeTeamScore,
        awayTeamScore: awayTeamScore
       }
       dispatch({ type: FETCHED_TEAM_SCORES, payload: teamsScore})
     }
     if(game.status !== 'scheduled'){
       // console.log(res.data.home)
       const homeCoaches = res.data.home.coaches
       if(homeCoaches.length !== 0){
         // console.log(res.data.home, 'home')
         const homTeamCoache = homeCoaches[0]
          let obj = {}
         obj['coache'] = homeCoaches[0]

         const homePlayers = res.data.home.players
         // console.log(homePlayers, 'home players')
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

           dispatch({ type: HOME_TEAM_INFO_FOR_NBA, payload: multiArray})
       }
     }
     if(game.status !== 'scheduled'){
       const awayCoaches = res.data.away.coaches
       if(awayCoaches.length !== 0){

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
       }
     }
     callback()
   })
}

export const fetchMatchScrores = (games) => async dispatch => {
  // console.log(games, 'games')
  const matchPromises = []
  games.map(async (garenderNBAMatchesme, index) => {
    const gameId = game.id
    const gameStatus = game.status
    // console.log(gameStatus, 'game status')
    // console.log(gameStatus === 'inprogress')
    if(gameStatus === 'inprogress'){
      console.log(game.away_points)
      console.log(game.home_points)
      // console.log('in progresss ]')
      const url = `http://api.sportradar.us/nba/trial/v5/en/games/${gameId}/summary.json?api_key=${NBA_API_KEY}`
      matchPromises.push(axios.get(url))
    }
  })
  // console.log(matchPromises,'matchPromises')
  axios.all(matchPromises)
  .then(res => {
    // console.log(res, 'response')
    dispatch({ type: LIVE_NBA_GAMES_INFO, payload: res })
    // let homeTeamData = res
    // let awayTeamData = res
    // console.log(homeTeamData, 'homeTeamData')
    // console.log(awayTeamData, 'awayTeamData')
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
  const url2 = `https://newsapi.org/v2/everything?language=en&q=basketball&page=1&from=${startingDate}&to=${endDate}&sortBy=popularity&apiKey=${NBA_NEWS_API_KEY}`
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
  dispatch({ type: CLEAR_ERROR_MESSAGE_FOR_NBA })
}

export const fetchLiveMatches = (NBAGames) => async dispatch => {
  // console.log(NBAGames, 'nbaGames')
  NBAGames.map((game, i) => {
    const status = game.status
    if(status === 'inprogress') {
      const gameId = game.id
      console.log(game.id, 'id')
      const url = `http://api.sportradar.us/nba/trial/v5/en/games/${gameId}/summary.json?api_key=${NBA_API_KEY}`
      console.log(url, 'url')
      axios.get(url)
       .then(res => {
         let awayTeamPoints = res.data.away.points
         let homeTeamPoints = res.data.home.points
         console.log(awayTeamPoints, 'away team points')
         console.log(homeTeamPoints, 'home team points')
         const teamObj = {
           awayTeamPoints: res.data.away.points,
           awayTeamName: game.away.name,
           homeTeamPoints: res.data.home.points,
           homeTeamName: game.home.name,
         }
         dispatch({ type: FETCHED_LIVE_MATCHES_AND_SCORES, payload: teamObj })
       })

    }
  })
}
