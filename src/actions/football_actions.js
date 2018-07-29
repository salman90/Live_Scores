import moment from 'moment';
import axios from 'axios';
import { FETCHED_FOOTBALL_MATCHES, GAME_INFO_FOOTBALL } from './types'

export const getTodaysMatchesForFootball = () => async dispatch => {
  const API_KEY = 'eh7pgue3fj5gc8a57rsqux9c'
  const date = '2017-04-02'
  const TodaysDate = moment().format('YYYY/MM/DD')
  const url = `https://api.sportradar.us/soccer-xt3/eu/en/schedules/${date}/results.json?api_key=${API_KEY}`
  axios.get(url)
   .then(res => {
     const results = res.data.results
     let games = []
     // console.log(results)
     results.map((game, i) => {
       // console.log(game.sport_event.competitors[0])
       // console.log(game.sport_event.competitors[1])
       let tournamentInfo = game.sport_event.tournament
       let matchId = game.sport_event.id
       let matchTime = game.sport_event.scheduled
       let homeTeam = game.sport_event.competitors[0]
       let awayTeam = game.sport_event.competitors[1]
       // console.log('homeTeam', game.sport_event.competitors[0] )
       // console.log('awayTeam', game.sport_event.competitors[1])
       // console.log(game.sport_event.competitors)
       let matchStatus = game.sport_event_status
       let HalfScore = game.sport_event_status.period_scores

       let firstHalfScore  = null
       let secondHalfScore = null
        if(typeof HalfScore != 'undefined'){
           firstHalfScore = game.sport_event_status.period_scores[0]
           secondHalfScore = game.sport_event_status.period_scores[1]
        }

       let matchDetails = {
         tournamentInfo: game.sport_event.tournament,
          matchId: game.sport_event.id,
          matchTime: game.sport_event.scheduled,
          matchStatus: game.sport_event_status,
          firstHalfScore: firstHalfScore,
          secondHalfScore: secondHalfScore,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
       }
       games.push(matchDetails)
       // return games
     })
     dispatch({ type: FETCHED_FOOTBALL_MATCHES, payload: games })
   })
}

export const getMatchDetails = (game,callback) => async dispatch => {
  const API_KEY = 'eh7pgue3fj5gc8a57rsqux9c'
  const gameUid = game.matchId
  console.log(game.matchId)
  const url = `https://api.sportradar.us/soccer-xt3/eu/en/matches/${gameUid}/lineups.json?api_key=eh7pgue3fj5gc8a57rsqux9c`
  axios.get(url)
   .then((res) => {
     let matchEvent =  res.data
       console.log(matchEvent)
   })
  callback()
}
