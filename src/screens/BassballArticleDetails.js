import React, { Component } from 'react';
import { View, Text, Image, Dimensions  } from 'react-native';
// import CacheImage from '../components/cacheImage';
import { CacheManager } from "react-native-expo-image-cache";
// import { file}
import { Icon } from 'react-native-elements';

const {height, width} = Dimensions.get('window');

class BassballArticleDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (<Icon type='font-awesome' name='arrow-circle-left' size={25}
  containerStyle={{ paddingLeft: 15 }} color='#000' onPress={() => navigation.goBack()} />),
    }
  }
  componentDidMount() {
    const navParams = this.props.navigation.state.params
    // console.log(navParams.urlToImage)
    const path = CacheManager.get(navParams.urlToImage).getPath();
    // console.log(path.exsits)
    // console.log(path)
    // console.log()
    // console.log(this.props.navParams)
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
