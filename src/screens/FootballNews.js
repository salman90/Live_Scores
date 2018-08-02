import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator, FlatList, TouchableHighlight, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Button } from 'react-native-elements';


class FootballNews extends Component {
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
      <List
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
          <ListItem
            title={item.title}
            avatar={size="medium",{uri: item.urlToImage}}
            subtitle={item.publishedAt}
          />
        </TouchableHighlight>
       )
       }
       />

      </List>
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
