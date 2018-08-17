import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect }  from 'react-redux';
import * as actions from '../actions';
import { Icon } from 'react-native-elements';


const {height, width} = Dimensions.get('window')


class MatchDetailsForFootball extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (<Icon type='font-awesome' name='arrow-circle-left' size={25}
  containerStyle={{ paddingLeft: 15 }} color='#000' onPress={() => navigation.goBack()} />),
    }
  }

  renderHomeTeamInfo(){
    console.log('salman is here')
  }

  renderAwayTeamInfo(){
    console.log('in away team ')

  }

  renderMatchStages = () => {
    const { footballMatchDetails } = this.props
    // console.log(footballMatchDetails)
    const eventInfo  = footballMatchDetails.sport_event
    const schedule = eventInfo.scheduled
    const homeTeamInfo = footballMatchDetails.sport_event.competitors[0]
    const awayTeamInfo = footballMatchDetails.sport_event.competitors[1]
    const tournamentInfo = eventInfo.tournament
    const tournamentName = tournamentInfo.name
    const tournamentCountry = tournamentInfo.category.name
    const eventStatus = footballMatchDetails.sport_event_status
    const awayScore = eventStatus.away_score
    const homeScore = eventStatus.home_score
    const status = eventStatus.status
    // console.log()
    console.log(status)
    if(status === 'closed') {
      // console.log(eventInfo)
      return (
        <View
         style={styles.mainContainerStyle}
        >
         <View
         style={styles.cardContainerStyle}
         >
           <View
            style={styles.cardTitleContainerStyle}
           >
            <Text
            selectable={true}
            numberOfLines={1}
            style={styles.tournamentStyle}
            >{`${tournamentName}`}</Text>
           </View>
           <View
             style={styles.teamContainerStyle}
           >
               <View
                style={styles.awayTeamContainer}
               >

                  <View>
                    <Text
                    style={styles.teamName}
                    selectable={true}
                    numberOfLines={1}
                    >
                     {awayTeamInfo.abbreviation}
                    </Text>
                  </View>
                  <View

                  >
                     <Text
                     style={styles.awayScoreStyle}
                     >{awayScore}</Text>
                  </View>

               </View>
             <View
             style={styles.homeTeamContainerStyle}
             >
              <View
              >
                 <Text
                 style={styles.homeScoreStyle}
                 >{homeScore}</Text>
              </View>
              <View>
                  <Text
                  style={styles.homeTeamNameStyle}
                  selectable={true}
                  numberOfLines={1}
                  >
                    {homeTeamInfo.abbreviation}
                  </Text>
              </View>
            </View>
           </View>
           <View>

           </View>
           <View>

           </View>
         </View>
        </View>
      )
    }else if(status === 'live') {
      return (
        <View
         style={styles.mainContainerStyle}
        >
         <View
         style={styles.cardContainerStyle}
         >
           <View
            style={styles.cardTitleContainerStyle}
           >
            <Text
            selectable={true}
            numberOfLines={1}
             style={styles.tournamentStyle}
            >{`${tournamentName}`}</Text>
           </View>
           <View
             style={styles.teamContainerStyle}
           >
               <View
                style={styles.awayTeamContainer}
               >

                  <View>
                    <Text
                    style={styles.teamName}
                    selectable={true}
                    numberOfLines={1}
                    >
                     {awayTeamInfo.abbreviation}
                    </Text>
                  </View>
                  <View

                  >
                     <Text
                     style={styles.awayScoreStyle}
                     >{awayScore}</Text>
                  </View>

               </View>
             <View
             style={styles.homeTeamContainerStyle}
             >
              <View
              >
                 <Text
                 style={styles.homeScoreStyle}
                 >{homeScore}</Text>
              </View>
              <View>
                  <Text
                  style={styles.teamName}
                  selectable={true}
                  numberOfLines={1}
                  >
                    {homeTeamInfo.abbreviation}
                  </Text>
              </View>
            </View>
           </View>
           <View>

           </View>
           <View>

           </View>
         </View>
        </View>
      )
    }else if (status === 'not_started'){
      console.log(typeof homeScore === 'undefined')
      return (
        <View
         style={styles.mainContainerStyle}
        >
         <View
         style={styles.cardContainerStyle}
         >
           <View
            style={styles.cardTitleContainerStyle}
           >
            <Text
            selectable={true}
            numberOfLines={1}
             style={styles.tournamentStyle}
            >{`${tournamentName}`}</Text>
           </View>
           <View
             style={styles.teamContainerStyle}
           >
               <View
                style={styles.awayTeamContainer}
               >

                  <View>
                    <Text
                    style={styles.teamName}
                    selectable={true}
                    numberOfLines={1}
                    >
                     {awayTeamInfo.abbreviation}
                    </Text>
                  </View>
                  <View

                  >
                     <Text
                     style={styles.awayScoreStyle}
                     >{typeof awayScore === 'undefined'? 0 : awayScore}</Text>
                  </View>

               </View>
             <View
             style={styles.homeTeamContainerStyle}
             >
              <View
              >
                 <Text
                 style={styles.homeScoreStyle}
                 >{typeof homeScore === 'undefined'? 0 : homeScore}</Text>
              </View>
              <View>
                  <Text
                  style={styles.teamName}
                  selectable={true}
                  numberOfLines={1}
                  >
                    {homeTeamInfo.abbreviation}
                  </Text>
              </View>
            </View>
           </View>
           <View>

           </View>
           <View>

           </View>
         </View>
        </View>
      )
    }
  }
  render(){
    const { loadingMatchDetails } = this.props
    // console.log(loadingMatchDetails, 'sksks')
    if(loadingMatchDetails) {
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <ActivityIndicator
           size='large'
           color="#0000ff"
          />
        </View>
      )
    }
    return(
      <View
       style={{ flex: 1 }}
       >
        {this.renderMatchStages()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ab372b',
    justifyContent: 'center',
  },
  cardContainerStyle: {
    marginTop: 10,
    flexDirection: 'column',
     backgroundColor: '#fff',
     borderRadius: 8,
     width: width * 0.95,
     height: 300,
     alignItems: 'center',
     justifyContent: 'center'
  },
  cardTitleContainerStyle: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tournamentStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  teamContainerStyle: {
     flexDirection: 'row',
     width: width * 0.90,
     marginTop: 20,
     alignItems: 'center',
     justifyContent: 'space-around'
  },
  awayTeamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120
  },
  teamName: {
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: 'bold'
  },
  awayScoreStyle: {
    fontSize: 25,
    marginLeft: 2
  },
  homeScoreStyle: {
    fontSize: 25,
    marginRight: 2
  },
  homeTeamContainerStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120
  },
  homeTeamNameStyle: {
    fontSize: 25
  },
})

const mapStateToProps = state => {
  return {
    loadingMatchDetails: state.football.loadingMatchDetails,
    footballMatchDetails: state.football.footballMatchDetails
  }
}

export default connect(mapStateToProps, actions)(MatchDetailsForFootball);
