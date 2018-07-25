import React, { Component} from 'react';
import {View, Text } from 'react-native';


class Calendar extends Component {
  render(){
    return (
      <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}

      >
        <Text>Calendar</Text>
      </View>
    )
  }
}

export default Calendar;
