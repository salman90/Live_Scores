import React, { Component} from 'react';
import {View, Text, Image, StyleSheet } from 'react-native';


class NBALiveMatches extends Component {
  render(){
    return (
      <View
      style={styles.imageContianer}
      >
        <Image
        style={styles.imageStyle}
        source={require('../images/logo.jpg')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  imageContianer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ab372b'
  },
  imageStyle: {
    width: 250,
    height: 150
  },
})

export default NBALiveMatches;
