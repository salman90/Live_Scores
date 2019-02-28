import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native'
import axios from 'axios'
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import { FIREBASE_API_KEY } from 'react-native-dotenv';
import store from './store'
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux'
import { Icon, Button  } from 'react-native-elements'
import NBALiveMatches from './screens/NBALiveMatches';
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
import FootballLiveScores from './screens/footballLiveScores';
import BassballLiveScores from './screens/bassballLiveScores';
import LiveFootballMatchDetails from './screens/liveFootballMatchDetails';
// import BassballLiveMatchDetials from './screens/bassballLiveMatchDetails';
// import Auth from './screens/Auth';
import firebase from 'firebase';
import { AppLoading, Asset } from 'expo';


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}



class App extends Component {
  state = {
    isReady: false,
  }


  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./images/logo.jpg'),
    ])
    await Promise.all([ ...imageAssets ])
  }
  componentWillMount(){
    const config = {
    apiKey: FIREBASE_API_KEY,
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
   const stackNavForFootballLive = createStackNavigator({
     FootballLiveScores: {screen: FootballLiveScores},
     LiveFootballMatchDetails: {screen: LiveFootballMatchDetails}
   })
   const tabNavForFootball = createBottomTabNavigator({
     FootballScores: {
       screen: stackNavFootball
     },
     footballLiveScores: {
       screen: stackNavForFootballLive
     },
   }, {
     navigationOptions: ({ navigation }) => ({
       tabBarOptions: {
         style: {
           borderTopWidth:4,
          borderTopColor:'#000',
         },
       },
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
        }else if(routeName === 'footballLiveScores'){
          return (
            <Icon
            name='ios-stopwatch'
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

   // const stackNavForLiveNBAMatches =

   const tabNavForNBA =  createBottomTabNavigator({
     NBAScores: {
       screen: stackNavforNBA
     },
     NBALiveMatches: {
       screen: NBALiveMatches
     },
   }, {
     navigationOptions: ({ navigation }) => ({
       tabBarOptions: {
         style: {
           backgroundColor: '#fff',
           borderTopWidth:4,
          borderTopColor:'#000',
         },
       },
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
         else if(routeName ==='NBALiveMatches'){
           return (
             <Icon
             name='ios-stopwatch'
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
   })

   const stackNavForLiveBassballMatches = createStackNavigator({
     BassballLiveScores: { screen: BassballLiveScores },
     // BassballLiveMatchDetails: { screen: BassballLiveMatchDetials }
   })

   const tabNavForBassBall = createBottomTabNavigator({
     BassBallScores: {
       screen: StackNavForBassBall
     },
     bassballLiveScores: {
       screen: stackNavForLiveBassballMatches
     },
   }, {
     navigationOptions: ({ navigation }) => ({
       tabBarOptions: {
         style: {
           backgroundColor: '#fff',
           borderTopWidth:4,
          borderTopColor:'#000',
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
         }else if(routeName === 'bassballLiveScores'){
           return(
             <Icon
              type='ionicon'
              name='ios-stopwatch'
              size={25}
             />
           )
         }
       }
     })
   })





   const drowerNav = createDrawerNavigator({
     BassballScores: {
       screen: tabNavForBassBall,
         navigationOptions: {
           title: 'MLB',
           drawerIcon:
           <Icon
            type='ionicon'
            name='ios-baseball'
            size={25}
           />
         },
     },
     FootballScores: {
       screen: tabNavForFootball, navigationOptions: {
          title: 'Football',
          drawerIcon:<Icon
          name='ios-football'
           type='ionicon'
           size={25}
          />
        },
     },
     NBAScores: {
       screen: tabNavForNBA,
       navigationOptions: {
          title: 'NBA',
          drawerIcon:
          <Icon
           name='ios-basketball'
           type='ionicon'
           size={25}
          />
        },
     },
   }, {
     navigationOptions: (navigation) => ({

     }),
     initialRouteName: 'BassballScores',
     contentComponent: customDrowerNav,
     drawerOpenRoute: 'DrawerOpen',
     drawerCloseRoute: 'DrawerClose',
     drawerTaggleRoute: 'DrawerTaggle'
   })

   const TabNavigator = createStackNavigator({
     sports: {
       screen: drowerNav
     },
   },{
     lazy: true,
      swipeEnabled: false,
      navigationOptions: (navigation) => ({
        header: null,
      }),
   })
     if(!this.state.isReady){
        return (
          <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
          />
        )
     }
   return (
     <Provider store={store}>
      <AppNavigator />
     </Provider>
   )
 }
}



const customDrowerNav = (props) => {
  return (
    <View
     style={{ flex: 1, backgroundColor: '#ab372b'}}
    >
    <View
     style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}
    >
     <Image
     style={{
       width: 220,
       height: 120,
     }}
     source={require('./images/logo.jpg')}
     />
    </View>
    <SafeAreaView style={{flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </View>
  )
}


export default App;
