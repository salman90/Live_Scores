import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { List, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';
import moment from 'moment';
import CacheImage from '../components/cacheImage';
import listItemPureComponent from '../components/listItemPureComponent';
import ListItem from '../components/listItem';


class BassballNews extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Live Scores',
      headerStyle: {
            backgroundColor: '#fff',
        },
        headerRight: (
          <Icon
            type='font-awesome'
             size={25}
             onPress={navigation.getParam('SignOut')}
             name='sign-out'
          />
        ),
    }
  }

  componentDidMount() {
    this.props.getBassballNews()
    this.props.navigation.setParams({ SignOut: this._signUserOut });
  }

  _signUserOut = () => {
    Alert.alert(
      'SignOut',
      'Are You Sure That You Want To Sign Out',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () =>  this.props.signUserOut(() =>{
          this.props.navigation.navigate('auth')
        })},
      ]
    )
  };

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

export default connect(mapStateToProps, actions)(BassballNews)
