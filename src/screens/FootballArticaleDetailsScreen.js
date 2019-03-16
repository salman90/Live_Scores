import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableHighlight  } from 'react-native';
import { Icon } from 'react-native-elements';
import Expo, { WebBrowser} from 'expo'
import moment from 'moment';


const {height, width} = Dimensions.get('window');

class FootballArticaleDetailsScreen extends Component {
  constructor(props){
    super(props);
    this.openArticle = this.openArticle.bind(this)
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (<Icon type='font-awesome' name='arrow-circle-left' size={25}
  containerStyle={{ paddingLeft: 15 }} color='#000' onPress={() => navigation.goBack()} />),
      title: 'Article Details',
    }
  }

  openArticle(){
    let link = this.props.navigation.state.params.url
    WebBrowser.openBrowserAsync(link)
  }

  componentDidMount() {
    const navParams = this.props.navigation.state.params
    // console.log(navParams, 'nav Params')
    console.log(this.props.navigation.state.params.url, 'image url')
  }
  render(){
    return (
      <View
       style={styles.container}
      >
        <View
        >
          <Text>{this.props.navigation.state.params.title}</Text>
        </View>
        <View
         style={styles.imageContianer}
        >
          <Image
              style={styles.imageStyle}
              source={{uri: this.props.navigation.state.params.urlToImage}}
          />
        </View>
        <View
         style={styles.articleDescription}
        >
          <Text
          style={styles.dateStyle}
          >
          {`publishedAt: ${moment(this.props.navigation.state.params.publishedAt).format('LL')}`}
          </Text>
          <Text>
            {this.props.navigation.state.params.description}
          </Text>
          <TouchableHighlight
           onPress={this.openArticle}
          >
            <View
             style={styles.articleLinkContainer}
            >
               <Text>
               View full article:
               </Text>
                <Text
                selectable={true}
                numberOfLines={1}
                style={styles.articleStyle}
                >
                {this.props.navigation.state.params.url}
                </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  imageContianer: {
    marginTop: 10,
  },
  imageStyle: {
    width: width * 0.85,
    height: 250
  },
  articleDescription: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  articleLinkContainer: {
    marginTop: 5
  },
  articleStyle: {
    color: 'blue'
  },
  dateStyle: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 5
  },
})

export default FootballArticaleDetailsScreen
