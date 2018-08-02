import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';


class MatchDetailsForFootball extends Component {
  renderHomeTeamInfo(){
    console.log('salman is here')
  }

  renderAwayTeamInfo(){
    console.log('in away team ')
  }

  renderMatchStages = () => {
  }
  render(){
    return(
      <View
       style={{ flex: 1, marginTop: 10}}
       >
        {this.renderMatchStages()}
      </View>
    )
  }
}

export default MatchDetailsForFootball;
