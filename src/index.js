import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import axios from 'axios'
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import store from './store'
import { Provider } from 'react-redux'
import { Icon, Button  } from 'react-native-elements'
import LiveScores from './screens/LiveScores';
import Calendar from './screens/Calendar';
import Sports from './screens/Sports';
import GameDetails from './screens/GameDetails';
import FootballScores from './screens/FootballScores';
import BassBallScores from './screens/BassBallScores';
import NBAScores from './screens/NBAScores';
import MatchDetailsForBassball from './screens/MatchDetailsForBassball';
import NBAMatchDetails  from './screens/NBAMatchDetails';
import MatchDetailsForFootball from './screens/MatchDetailsForFootball';
import NBANews from './screens/NBANews';
import FootballNews from './screens/FootballNews';
import BassballNews from './screens/BassballNews';
import footballArticleDetails from './screens/footballArticleDetails';
import NBAArticleDetails from './screens/NBAArticleDetails';
import BassballArticleDetails from './screens/BassballArticleDetails';
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
  }




 render(){
   const  stackNavFootball = createStackNavigator({
     FootballScores: {screen: FootballScores},
     MatchDetailsForFootball: {screen: MatchDetailsForFootball}
   }, {
     navigationOptions: ({navigation}) => ({
       title: `Live Scores`,
     })
   })
   const stackNavForFootballNews = createStackNavigator({
     FootballNews: {screen: FootballNews},
     footballArticleDetails: {screen: footballArticleDetails}
   })
   const tabNavForFootball = createBottomTabNavigator({
     FootballScores: {
       screen: stackNavFootball
     },
     footballnews: {
       screen: stackNavForFootballNews
     },
     calendar: {
       screen: Calendar
     },
   }, {
     navigationOptions: ({ navigation }) => ({
       tabBarIcon: ({ focused, tintColor }) => {
         const { routeName } = navigation.state;
         if(routeName === 'FootballScores'){
           return(
             <Icon
             name='ios-football'
              type='ionicon'
              size={25}
             />
           )
         }
        else if(routeName === 'footballnews'){
          return (
            <Icon
            name='ios-paper'
             type='ionicon'
             size={25}
            />
          )
        }
       }
     })

   })
   const stackNavForNBANews = createStackNavigator({
     NBANews: {screen: NBANews},
     NBAArticleDetails: {screen: NBAArticleDetails}
   })
   const stackNavforNBA = createStackNavigator({
     NBAScores: {screen: NBAScores},
     NBAMatchDetails: {screen: NBAMatchDetails}
   })

   const tabNavForNBA =  createBottomTabNavigator({
     NBAScores: {
       screen: stackNavforNBA
     },
     NBANews: {
       screen: stackNavForNBANews
     },
     calendar: {
       screen: Calendar
     },
   }, {
     navigationOptions: ({ navigation }) => ({
       tabBarIcon: ({ focused, tintColor }) => {
         const { routeName } = navigation.state;
         if(routeName === 'NBAScores'){
           return (
             <Icon
              name='ios-basketball'
              type='ionicon'
              size={25}
             />
           )
         }
         else if (routeName === 'NBANews'){
           return (
             <Icon
              name='ios-paper'
              type='ionicon'
              size={25}
             />
           )
         }
       }
     })
   })

   const StackNavForBassBall = createStackNavigator({
     BassBallScores: {
       screen: BassBallScores
     },
     MatchDetailsBassball: {
       screen: MatchDetailsForBassball
     },
   })
   const StackNavForBassballNews = createStackNavigator({
     BassballNews: {screen: BassballNews},
     BassballArticleDetails: {screen: BassballArticleDetails}
   }, {
     cardStyle: {
       backgroundColor: '#000'
     },
   })

   const tabNavForBassBall = createBottomTabNavigator({
     BassBallScores: {
       screen: StackNavForBassBall
     },
     BassballNews: {
       screen: StackNavForBassballNews
     },
     calendar: {
       screen: Calendar
     },
   }, {
     navigationOptions: ({ navigation }) => ({
       tabBarOptions: {
         style: {
           backgroundColor: '#ab372b'
         },
       },
       tabBarIcon: ({ focused, tintColor }) => {
         const { routeName } = navigation.state;
         if(routeName === 'BassBallScores'){
           return (
             <Icon
              type='ionicon'
              name='ios-baseball'
              size={25}
             />
           )
         }else if(routeName === 'BassballNews'){
           return (
             <Icon
              type='ionicon'
              name='ios-paper'
              size={25}
             />
           )
         }
       }
     })
   })

   const stackNavForLiveScores = createStackNavigator({
     livescores: { screen:  LiveScores },
     gameDetails: { screen: GameDetails }

   }, {
     navigationOptions: () => ({
       title: `BarBack`,
     })
   })




   const drowerNav = createDrawerNavigator({
     BassBallScores: {
       screen: tabNavForBassBall
     },
     FootballScores: {
       screen: tabNavForFootball
     },
     NBAScores: {
       screen: tabNavForNBA
     },

   }, {
     navigationOptions: ({navigation}) => ({
       drawerIcon: ({ focused, tintColor }) => {
         const { routeName } = navigation.state;
       }
     })
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
