import React, { Component} from 'react';
import {View, Text, ActivityIndicator, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Card }  from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';


  // const API_KEY = '8uevyeqyb38gms9t8qmbtj5w'


class LiveScores extends Component {

  state = {
    games: []
  }

  async componentWillMount() {
    const date = moment().format('YYYY/MM/DD')
    const API_KEY = '8uevyeqyb38gms9t8qmbtj5w'

    const data = await axios.get(`http://api.sportradar.us/mlb/trial/v6.5/en/games/${date}/boxscore.json?api_key=${API_KEY}`
    ).then(res => {
      console.log(res)
     const games = res.data.league.games

     // console.log(res.data.league)

       this.setState({ games: games  })


    })
  }


    onScorePress(game){
      this.props.navigation.navigate('gameDetails', { game: game})
    }

  renderLiveMatches() {
   const { games } = this.state
   return games.map((game, i) => {
     const homeTeamName = game.game.home.name
     const awayTeamName = game.game.away.name
     const homeTeamScore = game.game.home.runs
     const awayTeamScore = game.game.away.runs
     // console.log(i)
     return (
       <TouchableWithoutFeedback
       key={i}
      onPress={this.onScorePress.bind(this,game)}
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
    if(this.state.games.length === 0){
      return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
      >
         <ActivityIndicator size="large" color="#0000ff" />
      </View>
      )
    }else {
      return (
        <View
          style={{ flex: 1, marginTop: 10}}
         >
          <ScrollView
           style={{ flex: 1 }}
          >
          {this.renderLiveMatches()}
          </ScrollView>
         </View>
      )
    }
  }
}

export default LiveScores;
