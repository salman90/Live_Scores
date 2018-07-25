import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import axios from 'axios'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import LiveScores from './screens/LiveScores';
import Calendar from './screens/Calendar';
import Sports from './screens/Sports';
import GameDetails from './screens/GameDetails';
import Auth from './screens/Auth';
import firebase from 'firebase'



const API_KEY = '8uevyeqyb38gms9t8qmbtj5w'

class App extends Component {
  componentWillMount(){
    ///////
    const config = {
    apiKey: "AIzaSyB0rXZX-LXn0iw07K4SrWWndTP3hus1sFc",
    authDomain: "live-scores-b9be5.firebaseapp.com",
    databaseURL: "https://live-scores-b9be5.firebaseio.com",
    projectId: "live-scores-b9be5",
    storageBucket: "live-scores-b9be5.appspot.com",
    messagingSenderId: "697331398802"
  };

     firebase.initializeApp(config);
     //////////////////
  }

renderLiveMatches() {
 const { games } = this.state
 return games.map((game, i) => {
   const homeTeamName = game.game.home.name
   const awayTeamName = game.game.away.name
   const homeTeamScore = game.game.home.runs
   const awayTeamScore = game.game.away.runs
   return (
     <View
     key={i}
     style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20}}
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
     </View>
   )
 })
}


 render(){
   const TabNavigator = createBottomTabNavigator({
     livescores: {
        screen: createStackNavigator({
          livescores: { screen:  LiveScores },
          gameDetails: { screen: GameDetails }
        })
      },
     sports: { screen: Sports },
     calendar: {screen: Calendar }
   })
   // console.log(this.state.games)
   return (
     <Auth />
   )
 }
}



export default App;
