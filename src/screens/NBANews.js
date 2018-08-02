import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';




class NBANews extends Component {
  componentWillMount(){
    // this.props.renderNBANews()
  }


  _keyExtractor = (item, index) => item.title;
  render(){
    if(this.props.nbaArticles.length === 0){
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', flex:1 }}
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
        data={this.props.nbaArticles}
        renderItem={ ({ item }) => (
          <TouchableHighlight
           onPress={() => this.props.navigation.navigate('NBAArticleDetails', item)}
          >
            <ListItem
              title={item.title}
              avatar={{uri: item.urlToImage}}
            />
          </TouchableHighlight>
        )

        }
        keyExtractor={this._keyExtractor}
         />
      </List>
    )
  }
}

const mapStateToProps = state => {
  return {
    nbaArticles: state.NBA.nbaArticles
  }
}

export default connect(mapStateToProps, actions)(NBANews);
