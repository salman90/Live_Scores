import React, { Component } from 'react';
import { View, Text, Image, Dimensions  } from 'react-native';

const {height, width} = Dimensions.get('window');

class BassballArticleDetails extends Component {
  componentDidMount() {
    const navParams = this.props.navigation.state.params
    console.log(navParams)
  }
  render(){
    return(
      <View
       style={{ flex: 1, marginTop: 20, alignItems: 'center'}}
      >
        <View
        >
          <Text>{this.props.navigation.state.params.title}</Text>
        </View>
        <View
         style={{ marginTop: 10}}
        >
          <Image
              style={{width: width * 0.85, height: 250 }}
              source={{uri: this.props.navigation.state.params.urlToImage}}
          />
        </View>
        <View
         style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 5, marginRight: 5, marginTop: 10 }}
        >
          <Text>
            {this.props.navigation.state.params.description}
          </Text>
        </View>
      </View>
    )
  }
}

export default BassballArticleDetails;
