import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight, Alert, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';




class NBANews extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Live Scores',
      headerStyle: {
        backgroundColor: '#fff'
        },
    }
  }

  componentWillMount(){
    this.props.renderNBANews()
  }


  clearError(){
    this.props.clearErrorMessageForNBA()
  }


renderError = () => {
  const {newsError} = this.props
  if(newsError){
    Alert.alert(
      'Error',
      newsError,
      [
        {text: 'OK', onPress: this.clearError.bind(this)},

      ]
    )
  }
}

  _keyExtractor = (item, index) => item.title;
  render(){
    if(this.props.nbaArticles.length === 0){
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', flex:1 }}
        >
        {this.renderError()}
          <ActivityIndicator
           size="large" color="#0000ff"
          />
        </View>
      )
    }
    return (
      <View
       style={{ flex: 1 }}
      >
      {this.renderError()}

        <FlatList
        data={this.props.nbaArticles}
        renderItem={ ({ item }) => (
          <TouchableHighlight
           onPress={() => this.props.navigation.navigate('NBAArticleDetails', item)}
          >
            <View
             style={{ flexDirection: 'row', borderBottomWidth: 2, borderTopColor: 'gray' }}
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
                   >
                   {item.title.substr(0, 30)}...
                   </Text>
                 </View>
                 <View>
                   <Text
                    style={{ fontSize: 10, color: 'gray'}}
                   >
                    {item.publishedAt}
                   </Text>
                 </View>
              </View>
            </View>
          </TouchableHighlight>
        )

        }
        keyExtractor={this._keyExtractor}
         />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    nbaArticles: state.NBA.nbaArticles,
    newsError: state.NBA.newsError
  }
}

export default connect(mapStateToProps, actions)(NBANews);
