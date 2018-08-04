import React, { Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';


class LiveFootballMatchDetails extends Component{

  renderMatchDetails = () => {
    const { liveMatch } = this.props

    const matchInfo =  liveMatch.sport_event
    const matchCompetitors = matchInfo.competitors
    const homeTeamInfo = matchCompetitors[0]
    const awayTeamInfo = matchCompetitors[1]
    const homeTeamName = homeTeamInfo.name
    const awayTeamName = awayTeamInfo.name
    const matchVenue = matchInfo.venue
    const staduimName = matchVenue.name

    // console.log(homeTeamName, 'home Team Name',awayTeamName, 'away Team Name',staduimName, 'staduim name')

    const matchStatusInfo = liveMatch.sport_event_status
    const awayScore = matchStatusInfo.away_score
    const matchStatus = matchStatusInfo.status
    if(matchStatus == 'live'){
      const gameTime = matchStatusInfo.clock.match_time
    }
    const homeScore = matchStatusInfo.home_score
    const matchPeriod = matchStatusInfo.period
    const PeriodScores = matchStatusInfo.period_scores
    // const matchStatus = matchStatusInfo.status
    const firstHalfInfo = PeriodScores[0]
    const secondHalfInfo =  PeriodScores[1]

    console.log(typeof matchPeriod)
    // console.log(matchInfo)
    // console.log(awayScore, 'awayScore' ,gameTime, 'game time', homeScore, 'home score',
    // matchPeriod, 'match period',PeriodScores, 'period scores', matchStatus, 'Status')

    if(matchStatus === 'live'){
      return (
        <View>
          <View
           style={{ flexDirection: 'row' }}
          >
            <View
             style={{ flexDirection: 'row'}}
            >
              <Text>{awayTeamName}</Text>
              <Text>{awayScore}</Text>
            </View>
            <View
            style={{ flexDirection: 'row'}}
            >
              <Text>{homeScore}</Text>
              <Text>{homeTeamName}</Text>
            </View>
          </View>
          <View>
             {matchPeriod == 2?
               <View
                style= {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
               >
                <Text>First Half</Text>
                <Text>ssss</Text>
                <Text>sss</Text>
               </View>:
                null
             }
          </View>
        </View>
      )
    }
  }

  render(){
    return (
      <View
       style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
       {this.renderMatchDetails()}
      </View>
    )
  }
}

const mapStateToProps = state =>{
  return {
    liveMatch: state.football.liveMatch,
  }
}

export default connect(mapStateToProps, actions)(LiveFootballMatchDetails);
