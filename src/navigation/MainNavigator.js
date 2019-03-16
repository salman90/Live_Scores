import React, { Component } from 'react';

import { Platform, Image, View, DrawerItems } from 'react-native';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import { Icon, Button  } from 'react-native-elements'

import NBALiveMatches from '../screens/NBALiveMatches';
import FootballScores from '../screens/FootballScores';
import BassBallScores from '../screens/BassBallScores';
import NBAScores from '../screens/NBAScores';
import MatchDetailsForBassball from '../screens/MatchDetailsForBassball';
import NBAMatchDetails  from '../screens/NBAMatchDetails';
import MatchDetailsForFootball from '../screens/MatchDetailsForFootball';

import FootballLiveScores from '../screens/footballLiveScores';
import BassballLiveScores from '../screens/bassballLiveScores';
import LiveFootballMatchDetails from '../screens/liveFootballMatchDetails';
import BassballNewsScreen from  '../screens/BassballNewsScreen';
import FootballNewsScreen  from '../screens/FootballNewsScreen';
import NBANewsScreen from '../screens/NBANewsScreen';
import BassballArticleDetails from '../screens/BassballArticleDetails';
import FootballArticaleDetailsScreen from '../screens/FootballArticaleDetailsScreen';
import NBAArticleDetailsScreen from '../screens/NBAArticleDetailsScreen'



const  stackNavFootball = createStackNavigator({
  FootballScores: {screen: FootballScores},
  MatchDetailsForFootball: {screen: MatchDetailsForFootball}
})

stackNavFootball.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: () => (
      <Icon
      name='ios-football'
       type='ionicon'
       size={25}
      />
    ),
    tabBarLabel: 'football schedule',
  }
}

const stackNavForFootballLive = createStackNavigator({
  FootballLiveScores: {
    screen: FootballLiveScores
  },
  LiveFootballMatchDetails: {
    screen: LiveFootballMatchDetails
  }
})

const stackNavFootballNews = createStackNavigator({
  FootballNewsScreen: { screen: FootballNewsScreen },
  FootballArticaleDetailsScreen: { screen: FootballArticaleDetailsScreen }
})

stackNavFootballNews.navigationOptions = ( {navigation }) => {
  return {
    tabBarIcon: () => (
      <Icon
        name='ios-paper'
        type='ionicon'
        size={25}
      />
    ),
    tabBarLabel: 'football News',
  }
}

stackNavForFootballLive.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: () => (
      <Icon
      name='ios-stopwatch'
       type='ionicon'
       size={25}
      />
    ),
    tabBarLabel: 'football live',
  }
}

const tabNavForFootball = createBottomTabNavigator({
  stackNavFootball,
  stackNavFootballNews,
  stackNavForFootballLive,
})

const stackNavforNBA  =  createStackNavigator({
  NBAScores: {screen: NBAScores},
  NBAMatchDetails: {screen: NBAMatchDetails}
})

stackNavforNBA.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: () => (
      <Icon
       name='ios-basketball'
       type='ionicon'
       size={25}
      />
    ),
    tabBarLabel: 'NBA schedule',
  }
}

const stackNavForLiveNBAMatches = createStackNavigator({
  NBALiveMatches: {screen: NBALiveMatches},
  NBAMatchDetails: {screen: NBAMatchDetails}
})

stackNavForLiveNBAMatches.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: () => (
      <Icon
      name='ios-stopwatch'
       type='ionicon'
       size={25}
      />
    ),
    tabBarLabel: 'NBA live',
  }
}

const stackNavForNBANews = createStackNavigator({
  NBANewsScreen: { screen: NBANewsScreen},
  NBAArticleDetailsScreen: { screen: NBAArticleDetailsScreen }
})

stackNavForNBANews.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: () => (
      <Icon
        name='ios-paper'
        type='ionicon'
        size={25}
      />
    ),
    tabBarLabel: 'NBA News',
 }
}

const tabNavForNBA = createBottomTabNavigator({
  NBAScores: {
    screen: stackNavforNBA
  },
  NBANewsScreen: {
    screen: stackNavForNBANews
  },
  NBALiveMatches: {
    screen: stackNavForLiveNBAMatches
  },
})



const StackNavForBassBall = createStackNavigator({
  BassBallScores: {
    screen: BassBallScores
  },
  MatchDetailsBassball: {
    screen: MatchDetailsForBassball
  },
})

StackNavForBassBall.navigationOptions = ({ navigation }) => {
  return  {
    tabBarIcon: () => (
      <Icon
       type='ionicon'
       name='ios-baseball'
       size={25}
      />
    ),
    tabBarLabel: 'Baseball schedule',
  }
}

const stackNavForLiveBassballMatches = createStackNavigator({
  BassballLiveScores: { screen: BassballLiveScores },
  MatchDetailsBassball: { screen: MatchDetailsForBassball },
})

const StackNavForBassballNews = createStackNavigator({
  BassballNewsScreen: { screen: BassballNewsScreen },
  BassballArticleDetails: { screen: BassballArticleDetails}
})

StackNavForBassballNews.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: () => (
      <Icon
        name='ios-paper'
        type='ionicon'
        size={25}
      />
    ),
    tabBarLabel: 'Baseball News',
  }
}

stackNavForLiveBassballMatches.navigationOptions = ({ navigation }) =>{
  return {
    tabBarIcon: () => (
      <Icon
      name='ios-stopwatch'
       type='ionicon'
       size={25}
      />
    ),
    tabBarLabel: 'Baseball live',
  }
}



const tabNavForBassball = createBottomTabNavigator({
  StackNavForBassBall,
  StackNavForBassballNews,
  stackNavForLiveBassballMatches,
})



export default createDrawerNavigator({
  FootballScores: {
    screen: tabNavForFootball,
    navigationOptions: {
      title: 'Football',
      drawerIcon:
      <Icon
      name='ios-football'
       type='ionicon'
       size={25}
      />
    },
},
 BassBallScores:{
   screen: tabNavForBassball,
   navigationOptions: {
     title: 'MLB',
     drawerIcon:
      <Icon
        type='ionicon'
        name='ios-baseball'
        size={25}
      />
  }
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
  initialRouteName: 'FootballScores',
})


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
     source={require('../images/logo.jpg')}
     />
    </View>
    <SafeAreaView style={{flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </View>
  )
}
