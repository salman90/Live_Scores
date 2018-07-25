import React , {Component} from 'react';
import { View, Text } from 'react-native';

class GameDetails extends Component {
  componentDidMount() {
    const params = this.props.navigation.state.params
    const match = params.game.game
    console.log(params)
  }
  render(){
    return(
      <View>
       <Text>Game Details</Text>
      </View>
    )
  }
}














export default GameDetails;
