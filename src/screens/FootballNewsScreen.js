import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  Alert, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { List, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';
import moment from 'moment';
import CacheImage from '../components/cacheImage';
import ListItem from '../components/listItem';

class FootballNewsScreen extends Component {
  componentDidMount() {
    this.props.getFootballNews()
    this.props.navigation.setParams({ SignOut: this._signUserOut });
  }

  _signUserOut = () => {
    Alert.alert(
      'SignOut',
      'Are You Sure That You Want To Sign Out',
      [
        {text: 'Yes', onPress: () =>  this.props.signUserOut(() =>{
          this.props.navigation.navigate('Auth')
        })},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ]
    )
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Football News',
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

  _keyExtractor = (item, index) => item.urlToImage

  _renderItem = ({item}) => (
    <ListItem
      pageName='FootballArticaleDetailsScreen'
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


          <ActivityIndicator
          size="large" color="#0000"
          />
        </View>
      )
    }
    return(
      <View
        style={styles.containerStyle}
      >
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



export default connect(mapStateToProps, actions)(FootballNewsScreen)
