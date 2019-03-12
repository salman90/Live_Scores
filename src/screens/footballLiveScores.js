import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image, Alert, StyleSheet } from 'react-native';
import { Button, List, ListItem, Card, Icon  } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FootballLiveScores extends Component {
  constructor(props) {
    super(props);
    this.renderDetailsPage = this.renderDetailsPage.bind(this)
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Live Scores',
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerRight: (
        <Icon
          type='font-awesome'
           size={25}
           onPress={navigation.getParam('SignOut')}
           name='sign-out'
        />
      ),
    }
  }
  componentDidMount(){
    this.props.getFootballLiveScores()
    this.props.navigation.setParams({ SignOut: this._signUserOut });
  }

  _signUserOut = () => {
    Alert.alert(
      'SignOut',
      'Are You Sure That You Want To Sign Out',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () =>  this.props.signUserOut(() =>{
          this.props.navigation.navigate('Auth')
        })},
      ]
    )
  };


  renderDetailsPage = (game) => () => {
    this.props.liveMatchDetails(game, () => {
      this.props.navigation.navigate('LiveFootballMatchDetails')
    })
  }


  renderLiveScores() {
    const { liveGames } = this.props
      liveGames.sort(function(a,b){
        const keyA = new Date(a.sport_event.scheduled)
        const keyB = new Date(b.sport_event.scheduled)
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0
      })
    return liveGames.map((game, i) => {
      const matchInfo = game.sport_event
      const matchCompleteStatus = game.sport_event_status
      const homeTeamInfo = matchInfo.competitors[0]
      const homeTeamName = homeTeamInfo.name
      const awayTeamInfo = matchInfo.competitors[1]
      const awayTeamName = awayTeamInfo.name
      const tournamentName = matchInfo.season.name
      const status = matchCompleteStatus.status
        const awayTeamScore = matchCompleteStatus.away_score
        const homeTeamScore = matchCompleteStatus.home_score
        const matchPeriod = matchCompleteStatus.match_status
        const matchClock = matchCompleteStatus.clock
        console.log(status, 'status')
        console.log(matchClock, 'clock')
        console.log(typeof matchClock !== 'undefined')
      return (
        <View
        key={i}
        style={styles.cardContainerStyle}
        >
         <TouchableWithoutFeedback
          onPress={this.renderDetailsPage(game)}
         >
          <Card
          title={tournamentName}
          containerStyle={{
            backgroundColor: '#fff',
            borderColor: '#000',
            borderWidth: 2,
            borderRadius: 2,
          }}
          >
            <View>
              {status == 'closed' || status == 'ended' ? <Text>FT</Text>: null}
              {
                status == 'live' && typeof matchClock !== 'undefined'?
              <View
              style={{flexDirection: 'row'}}
              >
              <View
              style={styles.greendotStyle}
              ></View><Text>{matchClock.match_time}</Text></View>: null
            }
              {status == 'not_started'? <Text>{status}</Text>: null}
            </View>
            <View
            style={styles.teamsContainerStyle}
            >
             <Text
              style={styles.teamNameStyle}
             >
              {awayTeamName}
             </Text>
             <Text
             style={styles.teamScoreStyle}
             >
              {awayTeamScore}
             </Text>
            </View>
            <View
            style={styles.teamsContainerStyle}
            >
              <Text
               style={styles.teamNameStyle}
              >
                {homeTeamName}
              </Text>
              <Text
              style={styles.teamScoreStyle}
              >
               {homeTeamScore}
              </Text>
            </View>
          </Card>
          </TouchableWithoutFeedback>
        </View>
      )

    })
  }
  render(){
    const { liveGames, loadingLiveMatches } = this.props
    if(loadingLiveMatches){
      return (
      <View
       style={{
         alignItems: 'center',
         justifyContent: 'center',
         flex: 1,
         backgroundColor: '#ab372b',
       }}
      >
        <ActivityIndicator
         size='large'
         color="#000"
        />
      </View>
      )
    }
    if(liveGames.length === 0){
      return (
        <View
         style={styles.logoContainer}
        >
          <Image
            style={styles.logoImageStyle}
            source={require('../images/logo.jpg')}
          />
          <Text>No live matches today</Text>
        </View>

      )
    }
    return (
      <View
      style={styles.containerStyle}
      >
        <ScrollView>
          {this.renderLiveScores()}
        </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#ab372b'
  },
  cardContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20
  },
  greendotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10/2,
    backgroundColor: 'green',
    marginRight: 4
  },
  teamsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  teamNameStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  teamScoreStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  logoImageStyle: {
     width: 250,
     height: 130
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ab372b'
  },
})

const mapStateToProps = state => {
  return {
    liveGames: state.football.liveGames,
    loadingLiveMatches: state.football.loadingLiveMatches,
  }
}


export default connect(mapStateToProps, actions)(FootballLiveScores);
