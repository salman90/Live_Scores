import React, { Component } from 'react';
import {View, Text, ScrollView, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import { Card } from 'react-native-elements'
import * as actions from '../actions';
import moment from 'moment';


class BassballLiveScores extends Component {

  renderLiveMatches() {
    const { bassballGames } = this.props
    return bassballGames.map((game, i) => {
      const gameStatus =  game.game.status
      if(gameStatus == 'inprogress') {
        const homeTeamName = game.game.home.name
        const gameID = game.game.id
        const awayTeamName = game.game.away.name
        const homeTeamScore = game.game.home.runs
        const awayTeamScore = game.game.away.runs
        const gameStatus =  game.game.status
        const gameDate = game.game.scheduled
        const gameDateFormat = moment(gameDate).format("hh:mm a")
        return (
          <View
            key={gameID}
            style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
          >
          <Card
          key={gameID}
           title={'MLB'}
           titleStyle={{ color: '#000'}}
           containerStyle={{ backgroundColor: '#fff',
           borderColor: '#000', borderWidth: 2, borderRadius: 2  }}
          >
          <View>
            {gameStatus == 'scheduled' ? <Text>{gameDateFormat}</Text> : null}
            {gameStatus == 'inprogress'?
            <View style={[{
              width: 10,
              height: 10,
              borderRadius: 10/2,
              backgroundColor: 'green'}]}></View>: null}
            {gameStatus == 'closed' || gameStatus == 'complete' ? <Text>FT</Text>: null}
            {gameStatus =='wdelay'? <Text>Delay</Text>: null}
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
        )
      }
    })
  }


  render(){

    return (
      <View
      style={{ flex: 1, backgroundColor: '#ab372b'}}

      >
       <ScrollView
        style={{ flex: 1}}
       >
        {this.renderLiveMatches()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    bassballGames: state.bassball.bassballGames,
  }
}


export default connect(mapStateToProps, actions)(BassballLiveScores);
