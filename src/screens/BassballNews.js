import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import * as actions from '../actions';


class BassballNews extends Component {
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
      <List
       style={{ flex: 1 }}
      >
      {this.renderError()}
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
     NewsError: state.bassball.NewsError,
  }
}

export default connect(mapStateToProps, actions)(BassballNews)
