import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight, Alert, Image } from 'react-native';
import { List, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import ListItem from '../components/listItem';




class NBANews extends Component {

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

  componentDidMount(){
    this.props.renderNBANews()
    this.props.navigation.setParams({ SignOut: this._signUserOut });
  }


  _signUserOut = () => {
    // this.props.signUserOut()
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


  _renderItem = ({item}) => (
      <ListItem
        pageName='NBAArticleDetails'
        item={item}
        navigation={this.props.navigation}
      />
  )




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
    console.log(this.propsnbaArticles)
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
        renderItem={this._renderItem}
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
