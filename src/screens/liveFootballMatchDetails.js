import React, { Component} from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Icon } from 'react-native-elements';

const {height, width} = Dimensions.get('window')

class LiveFootballMatchDetails extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (<Icon type='font-awesome' name='arrow-circle-left' size={25}
  containerStyle={{ paddingLeft: 15 }} color='#000' onPress={() => navigation.goBack()} />),
    }
  }

  state = {
    tableHead: ['Team','first Half', 'Second Half'],

  }

  renderMatchDetails = () => {
    const { liveMatch } = this.props
    const matchInfo =  liveMatch.sport_event
    const tournamentName = matchInfo.season.name
    const matchCompetitors = matchInfo.competitors
    const homeTeamInfo = matchCompetitors[0]
    const awayTeamInfo = matchCompetitors[1]
    const homeTeamName = homeTeamInfo.name
    const awayTeamName = awayTeamInfo.name
    const homeTeamAb = homeTeamInfo.abbreviation
    const awayTeamAb = awayTeamInfo.abbreviation
    // console.log(matchInfo, 'matchInfo')
    const matchVenue = matchInfo.venue || null
    // console.log(matchVenue, 'matchVenue')
    if(matchVenue !== null){
      const staduimName = matchVenue.name || ''
    }
    const matchStatusInfo = liveMatch.sport_event_status
    const awayScore = matchStatusInfo.away_score
    const matchStatus = matchStatusInfo.status
    if(matchStatus === 'live'){
      const gameTime = matchStatusInfo.clock.match_time
    }
    const homeScore = matchStatusInfo.home_score
    const matchPeriod = matchStatusInfo.period
    if(matchStatus === 'live' || matchStatus === 'closed'){
      return (
        <View
         style={styles.cardContainerStyle}
        >
        <View
         style={styles.cardTitleContainerStyle}
        >
          <Text
           style={styles.cardTitleStyle}
           selectable={true}
           numberOfLines={1}
          >{tournamentName}
          </Text>
        </View>
          <View
           style={styles.teamContainerStyle}
          >
            <View
             style={styles.awayTeamRowStyle}
            >
              <Text
              style={styles.teamNameStyle}
              selectable={true}
              numberOfLines={1}
              >{awayTeamAb}</Text>
              <Text
              style={styles.teamsScoreStyle}
              >{awayScore}-</Text>
            </View>
            <View
            style={styles.homeTeamRowStyle}
            >
              <Text
              style={styles.teamsScoreStyle}
              >{homeScore}</Text>
              <Text
              style={styles.teamNameStyle}
              selectable={true}
              numberOfLines={1}
              >{homeTeamAb}</Text>
            </View>
          </View>
          <View
           style={{ width: width * 0.85}}
          >
            {this.renderMatchPeriod(matchPeriod, matchStatusInfo, homeTeamName, awayTeamName)}
          </View>
          <View>
          </View>
        </View>
      )
    }
  }

renderMatchPeriod = (matchPeriod, matchStatusInfo, home, away) => {
  if(matchPeriod === 1){
    const  awayTeamData = []
    const homeTeamData = []
    const awayScore = matchStatusInfo.away_score
    const homeScore = matchStatusInfo.home_score
    homeTeamData.push(home, homeScore, 0)
    awayTeamData.push(away, awayScore, 0)
    return (
      <Table
        borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
      >
       <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
       <Row data={awayTeamData}   />
       <Row data={homeTeamData} />
      </Table>

    )
  }else {

    const PeriodScores = matchStatusInfo.period_scores
    const firstHalfInfo = PeriodScores[0]
    const firstHalfAwayTeamScore = firstHalfInfo.away_score
    const firstHalfHomeTeamScore = firstHalfInfo.home_score
    const secondHalfInfo =  PeriodScores[1]
    const secondHalfAwayTeamScore = secondHalfInfo.away_score
    const secondHalfhomeTeamScore = secondHalfInfo.home_score
    const  awayTeamData = []
    const homeTeamData = []
    awayTeamData.push(away, firstHalfAwayTeamScore, secondHalfAwayTeamScore)
    homeTeamData.push(home, firstHalfHomeTeamScore,  secondHalfhomeTeamScore )
    return (
    <Table
      borderStyle={styles.borderTableStyle}
    >
     <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
     <Row data={awayTeamData}   />
     <Row data={homeTeamData} />
    </Table>
    )
  }
}

  render(){
    return (
      <View
       style={styles.mainContainerStyle}
      >
       {this.renderMatchDetails()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  mainContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ab372b'
  },
  cardContainerStyle: {
    width: width * 0.95,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTitleContainerStyle: {
    marginBottom: 10,
  },
  cardTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  teamContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  awayTeamRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100
  },
  homeTeamRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100
  },
  teamsScoreStyle: {
    fontWeight: 'bold',
    marginTop: 2
  },
  teamNameStyle: {
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: 'bold'
  },
  borderTableStyle: {
    borderWidth: 2,
    borderColor: '#c8e1ff'
  },
})

const mapStateToProps = state =>{
  return {
    liveMatch: state.football.liveMatch,
  }
}

export default connect(mapStateToProps, actions)(LiveFootballMatchDetails);
