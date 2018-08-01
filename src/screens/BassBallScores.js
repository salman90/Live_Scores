import React, { Component } from 'react';
import {View, Text, ActivityIndicator, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import DateScroller from '../components/dateScroller';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import axios from 'axios';



class BassBallScores extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Live Scores',

      headerStyle: {
            backgroundColor: '#ab372b',
        },
         headerLeft: (
           <Icon
           type='font-awesome'
            onPress={() => navigation.openDrawer()}
            name='bars'
            size={30}
            containerStyle={{ marginLeft: 5}}
           />
         )
    };
  }


  componentWillMount(){
    const date = moment().format('YYYY/MM/DD')
    this.props.getTodaysMatches(date)
    // console.log(this.props.bassballGames)
  }

  renderMatchDetail(game) {
    // console.log(game.game.id)
    this.props.getMachInfo(game, () => {
      this.props.navigation.navigate('MatchDetailsBassball')
    })
  }

  renderLiveMatches() {
    const { bassballGames } = this.props
    return bassballGames.map((game, i) => {
      const homeTeamName = game.game.home.name
      const awayTeamName = game.game.away.name
      const homeTeamScore = game.game.home.runs
      const awayTeamScore = game.game.away.runs
      const gameStatus =  game.game.status
      const gameDate = game.game.scheduled
      const gameDateFormat = moment(gameDate).format("hh:mm a")
      // console.log(gameDateFormat)
      return (
        <TouchableWithoutFeedback
          key={i}
          onPress={this.renderMatchDetail.bind(this, game)}
        >
          <View
          key={i}
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
          >
            <Card
             title={'MLB'}
             titleStyle={{ color: '#000'}}
             containerStyle={{ backgroundColor: '#fff',
             borderColor: '#000', borderWidth: 2, borderRadius: 2  }}
            >
            <View>
              {gameStatus == 'scheduled' ? <Text>{gameDateFormat}</Text> : null}
              {gameStatus == 'inprogress'? <Text>{gameStatus}</Text>: null}
              {gameStatus == 'closed'? <Text>{gameStatus}</Text>: null}
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
          </View>
        </TouchableWithoutFeedback>
      )
    })
  }
  render(){
     if(this.props.bassballGames.length === 0){
       return(
         <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
         >

           <Text>No Matches</Text>
         </View>
       )
     }
    return(
      <View
      style={{ flex: 1, backgroundColor: '#ab372b'}}
      >
        <DateScroller />
        <ScrollView
         style={{ flex: 1 }}
        >
         {this.renderLiveMatches()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps =  state => {
  return {
    bassballGames: state.bassball.bassballGames,
  }
}

export default connect(mapStateToProps, actions)(BassBallScores);
