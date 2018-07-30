import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import * as actions from '../actions';


class BassballNews extends Component {
  componentDidMount() {
    this.props.getBassballNews()
  }
  _keyExtractor = (item, index) => item.title;
  render(){
    // console.log(this.props.MLBNews)
    if(this.props.MLBNews.length === 0){
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <ActivityIndicator
            size='large'
            color="#0000ff"
          />
        </View>
      )
    }
    return (
      <List
       style={{ flex: 1 }}
      >
          <FlatList
            data={this.props.MLBNews}
            keyExtractor={this._keyExtractor}
            renderItem={ ({ item }) => (
              <TouchableHighlight
               onPress={() => this.props.navigation.navigate('BassballArticleDetails', item)}
              >
                <ListItem
                  title={item.title}
                  avatar={{uri: item.urlToImage}}

                />
              </TouchableHighlight>
            )}
          />
     </List>
    )
  }
}

const mapStateToProps = state => {
  return {
     MLBNews: state.bassball.MLBNews,
  }
}

export default connect(mapStateToProps, actions)(BassballNews)
