import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import axios from 'axios'
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import store from './store'
import { Provider } from 'react-redux'
import LiveScores from './screens/LiveScores';
import Calendar from './screens/Calendar';
import Sports from './screens/Sports';
import GameDetails from './screens/GameDetails';
import FootballScores from './screens/FootballScores';
import BassBallScores from './screens/BassBallScores'
import NBAScores from './screens/NBAScores'
import Auth from './screens/Auth';
import firebase from 'firebase';



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




 render(){
   const tabNavForFootball = createBottomTabNavigator({
     FootballScores: {
       screen: FootballScores
     },
     sports: {
       screen: Sports
     },
     calendar: {
       screen: Calendar
     },
   })
   const tabNavForNBA =  createBottomTabNavigator({
     NBAScores: {
       screen: NBAScores
     },
     sports: {
       screen: Sports
     },
     calendar: {
       screen: Calendar
     },
   })

   const tabNavForBassBall = createBottomTabNavigator({
     BassBallScores: {
       screen: BassBallScores
     },
     sports: {
       screen: Sports
     },
     calendar: {
       screen: Calendar
     },
   })

   const stackNaveForLiveScores = createStackNavigator({
     livescores: { screen:  LiveScores },
     gameDetails: { screen: GameDetails }

   })


   const drowerNav = createDrawerNavigator({
     FootballScores: {
       screen: tabNavForFootball
     },
     NBAScores: {
       screen: tabNavForNBA
     },
     BassBallScores: {
       screen: tabNavForBassBall
     },
   })

   const mainTabNav = createBottomTabNavigator({
      livescores: {
        screen: LiveScores
      },
      sports: {
        screen:  Sports
      },
      calendar: {
        screen: Calendar
      }
   })


   const TabNavigator = createBottomTabNavigator({
     auth: { screen: Auth},
     sports: {
       screen: drowerNav
     },
   },{
     lazy: true,
      swipeEnabled: false,
      navigationOptions: {
          tabBarVisible: false
      },
   })

   return (
     <Provider store={store}>
       <TabNavigator />
     </Provider>
   )
 }
}


export default App;
