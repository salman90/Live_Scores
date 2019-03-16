import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { List, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';
import moment from 'moment';
import CacheImage from '../components/cacheImage';
import ListItem from '../components/listItem';


class BassballNewsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'MLS News',
     headerStyle: {
           backgroundColor: '#fff',
       },
       headerRight: (
          <Icon
            type='font-awesome'
             size={25}
             name='sign-out'
          />
        ),
    }
  }

  componentDidMount() {
    this.props.getBassballNews()
  }

  _keyExtractor = (item, index) => item.title;

  _renderItem = ({item}) => (
      <ListItem
        pageName='BassballArticleDetails'
        item={item}
        navigation={this.props.navigation}
      />
  )

  render(){
    if(this.props.MLBNews.length === 0){
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <ActivityIndicator
            size='large'
            color="#0000"
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
            renderItem={this._renderItem}
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


export default connect(mapStateToProps, actions)(BassballNewsScreen)
