import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator, FlatList  } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Button } from 'react-native-elements';


class FootballNews extends Component {
  componentDidMount() {
    this.props.getFootballNews()
  }

  _keyExtractor = (item, index) => item.title

  render(){
    console.log(this.props.footballArticles)
    if(this.props.footballArticles.length === 0) {
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}
        >
          <ActivityIndicator
          size="large" color="#0000ff"
          />
        </View>
      )
    }
    return (
      <List
        style={{ flex: 1 }}
      >
       <FlatList
       data={this.props.footballArticles}
       keyExtractor={this._keyExtractor}
       renderItem={ ({ item }) => (
        <ListItem
          title={item.title}
          avatar={{uri: item.urlToImage}}
        />
       )
       }
       />

      </List>
    )
  }
}
const mapStateToProps = state => {
  return {
    footballArticles: state.football.footballArticles
  }
}

export default connect(mapStateToProps, actions)(FootballNews)
