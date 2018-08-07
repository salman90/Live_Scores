import React, { Component} from 'react';
import {View, Text, Image } from 'react-native';


class NBALiveMatches extends Component {
  render(){
    return (
      <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ab372b' }}
      >
        <Image
        style={{ width: 250, height: 150 }}
        source={require('../images/logo.jpg')}
        />
      </View>
    )
  }
}

export default NBALiveMatches;
