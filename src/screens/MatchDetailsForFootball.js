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
  render(){
    return(
      <View
       style={{ flex: 1, marginTop: 10}}
       >
        <Button
          title='drower Nav'
          onPress={() => this.props.navigation.openDrawer()}
        />
        <View
         style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
        >
        <View>
            <Button
             title='Home Team'
             onPress={this.renderHomeTeamInfo.bind(this)}
            />
        </View>
         <View>
            <Button
            title='Away Team'
            onPress={this.renderAwayTeamInfo.bind(this)}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default MatchDetailsForFootball;
