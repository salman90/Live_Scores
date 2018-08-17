import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList, TouchableHighlight, Alert, Image, StyleSheet } from 'react-native';
import { List, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Button } from 'react-native-elements';
import moment from 'moment';
import ListItem from '../components/listItem';


class FootballNews extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Live Scores',
      headerStyle: {
        backgroundColor: '#fff'
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
    this.props.getFootballNews()
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

  _keyExtractor = (item, index) => item.urlToImage

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

  _renderItem = ({item}) => (
    <ListItem
      pageName='footballArticleDetails'
      item={item}
      navigation={this.props.navigation}
    />
  )
  render(){
    if(this.props.footballArticles.length === 0) {
      return (
        <View
         style={styles.loadingContainer}
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
        style={styles.containerStyle}
      >
      {this.renderError()}

       <FlatList

       data={this.props.footballArticles}
       automaticallyAdjustContentInsets={false}
       keyExtractor={this._keyExtractor}
       renderItem={this._renderItem}
       />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
})

const mapStateToProps = state => {
  return {
    footballArticles: state.football.footballArticles,
    newsError: state.football.newsError
  }
}

export default connect(mapStateToProps, actions)(FootballNews)
