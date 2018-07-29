import React, { Component } from 'react'
import { View, Text, ScrollView,  } from 'react-native';
import moment from 'moment';
import type Moment from 'moment';
import { Button } from 'react-native-elements';


class FootballNews extends Component {
  render(){
    return (
      <View>
        <Button
           title='open nav'
           onPress={() => this.props.navigation.openDrawer() }
        />
      </View>
    )
  }
}

export default FootballNews
