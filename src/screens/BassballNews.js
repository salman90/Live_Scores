import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import * as actions from '../actions';
import moment from 'moment';
import CacheImage from '../components/cacheImage';


class BassballNews extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Live Scores',
      headerStyle: {
            backgroundColor: '#fff',
        },
    }
  }
  componentDidMount() {
    this.props.getBassballNews()
  }
  _keyExtractor = (item, index) => item.title;

  clearError(){
    this.props.clearError()
  }

  renderError = () => {
    const { NewsError } = this.props
    if(NewsError){
      Alert.alert(
        'Error',
        'something went in wrong',
        [
          {text: 'OK', onPress: this.clearError.bind(this)},
        ]
      )
    }
  }


  render(){
    // console.log(this.props.error)
    if(this.props.MLBNews.length === 0){
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
        {this.renderError()}
          <ActivityIndicator
            size='large'
            color="#0000ff"
          />
        </View>
      )
    }
    return (
      <View
       style={{ flex: 1}}
      >
          <FlatList
            data={this.props.MLBNews}
            automaticallyAdjustContentInsets={false}
            keyExtractor={this._keyExtractor}
            renderItem={ ({ item }) => (
              <TouchableHighlight
               onPress={() => this.props.navigation.navigate('BassballArticleDetails', item)}
              >
                <View
                  style={{ flexDirection: 'row', borderBottomWidth: 2, borderTopColor: 'gray'}}
                >
                <View>
                  <Image
                   source={{ uri: item.urlToImage }}
                   style={{ width: 100, height: 50, margin: 4 }}
                  />
                </View>
                <View>
                 <View>
                    <Text
                    numberOfLines={1}
                     style={{ flex: 1, justifyContent: 'center'}}
                    >{item.title.substr(0, 30)}...
                    </Text>
                </View>
                <View>
                  <Text
                   style={{ fontSize: 10, color: 'gray'}}
                  >{moment(item.publishedAt).format('LLL')}
                  </Text>
                </View>
                </View>
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
    )
  }
}

const mapStateToProps = state => {
  return {
     MLBNews: state.bassball.MLBNews,
     NewsError: state.bassball.NewsError,
  }
}

export default connect(mapStateToProps, actions)(BassballNews)
