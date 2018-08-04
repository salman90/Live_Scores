import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList, TouchableHighlight, Alert, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Button } from 'react-native-elements';
import moment from 'moment';


class FootballNews extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Live Scores',
      headerStyle: {
        backgroundColor: '#fff'
        }
    }
  }
  componentDidMount() {
    this.props.getFootballNews()
  }

  _keyExtractor = (item, index) => item.title

  clearError(){
    this.props.clearErrorInFootball()
  }

  renderError = () =>{
    const { newsError } = this.props

    if(newsError){
      Alert.alert(
        'Error',
        'something went wrong',
        [
          {text: 'OK', onPress: this.clearError.bind(this)},

        ]
      )
    }
  }

  render(){
    // console.log(this.props.footballArticles)
    if(this.props.footballArticles.length === 0) {
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}
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
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
      {this.renderError()}

       <FlatList

       data={this.props.footballArticles}
       keyExtractor={this._keyExtractor}
       renderItem={ ({ item }) => (
        <TouchableHighlight
         onPress={() => this.props.navigation.navigate('footballArticleDetails', item)}
        >
          <View
           style={{ flexDirection: 'row', borderWidth: 2, borderTopColor: 'gray' }}
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
                style={{ flex: 1, justifyContent: 'center' }}
               >{item.title.substr(0, 30)}...
               </Text>
             </View>
             <View>
                <Text
                 style={{ fontSize: 10 , color: 'gray'}}
                >{moment(item.publishedAt).format('LLL')}
                </Text>
             </View>
            </View>
          </View>
        </TouchableHighlight>
       )
       }
       />

      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    footballArticles: state.football.footballArticles,
    newsError: state.football.newsError
  }
}

export default connect(mapStateToProps, actions)(FootballNews)
