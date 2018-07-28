import React, { Component } from 'react';
import {View, Text, ActivityIndicator, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import axios from 'axios';



class BassBallScores extends Component {
  componentWillMount(){
    this.props.getTodaysMatches()
    // console.log(this.props.bassballGames)
  }

  renderLiveMatches() {
    const { bassballGames } = this.props
    return bassballGames.map((game, i) => {
      const homeTeamName = game.game.home.name
      const awayTeamName = game.game.away.name
      const homeTeamScore = game.game.home.runs
      const awayTeamScore = game.game.away.runs
      return (
        <TouchableWithoutFeedback
          key={i}
        >
          <View
          key={i}
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
          >
            <Card
            >
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
      style={{ flex: 1, marginTop: 10}}
      >
        <Button
           title='openDrawer'
           onPress={() => this.props.navigation.openDrawer()}
        />
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
