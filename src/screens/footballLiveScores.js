import React, { Component } from 'react';
import {View, Text, ScrollView, ActivityIndicator, TouchableWithoutFeedback, Image, Alert } from 'react-native';
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
    // this.props.signUserOut()
    Alert.alert(
      'SignOut',
      'Are You Sure That You Want To Sign Out',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () =>  this.props.signUserOut(() =>{
          this.props.navigation.navigate('auth')
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
      // console.log(matchCompleteStatus)
      const homeTeamInfo = matchInfo.competitors[0]
      // console.log(homeTeamInfo)
      const homeTeamName = homeTeamInfo.name
      // console.log(homeTeamName)
      const awayTeamInfo = matchInfo.competitors[1]
      const awayTeamName = awayTeamInfo.name
      // console.log(awayTeamName)
      const tournamentName = matchInfo.season.name
      // console.log(tournamentName)
      const status = matchCompleteStatus.status
      // if(status == 'live'){
        const awayTeamScore = matchCompleteStatus.away_score
        const homeTeamScore = matchCompleteStatus.home_score
        const matchPeriod = matchCompleteStatus.match_status

      // }
      // if(status == 'live'){
        const matchClock = matchCompleteStatus.clock

      // }

      return (
        <View
        key={i}
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
        >
         <TouchableWithoutFeedback
          onPress={this.renderDetailsPage(game)}
         >
          <Card
          title={tournamentName}
          >
            <View>
              {status == 'closed' || status == 'ended' ? <Text>FT</Text>: null}
              {status == 'live' ?
              <View
              style={{flexDirection: 'row'}}
              >
              <View
              style={{ width: 10, height: 10, borderRadius: 10/2, backgroundColor: 'green', marginRight: 4}}
              ></View><Text>{matchClock.match_time}</Text></View>: null
            }
              {status == 'not_started'? <Text>{status}</Text>: null}
            </View>
            <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}
            >
             <Text
              style={{fontSize: 15, fontWeight: 'bold'}}
             >
              {awayTeamName}
             </Text>
             <Text
             style={{fontSize: 15, fontWeight: 'bold'}}
             >
              {awayTeamScore}
             </Text>
            </View>
            <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10  }}
            >
              <Text
               style={{fontSize: 15, fontWeight: 'bold'}}
              >
                {homeTeamName}
              </Text>
              <Text
              style={{fontSize: 15, fontWeight: 'bold'}}
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
        <ActivityIndicator
         size='large'
         color="#0000ff"
        />
      )
    }
    if(liveGames.length === 0){
      return (
        <View
         style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ab372b'}}
        >
          <Image
            style={{ width: 250, height: 130}}
            source={require('../images/logo.jpg')}
          />
          <Text>No live matches today</Text>
        </View>

      )
    }
    return (
      <View
      style={{ flex: 1, backgroundColor: '#ab372b'}}
      >
        <ScrollView>
          {this.renderLiveScores()}
        </ScrollView>
    </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    liveGames: state.football.liveGames,
    loadingLiveMatches: state.football.loadingLiveMatches,
  }
}


export default connect(mapStateToProps, actions)(FootballLiveScores);
