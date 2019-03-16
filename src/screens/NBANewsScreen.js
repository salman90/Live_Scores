import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  Alert, Image, StyleSheet } from 'react-native';
import { List, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import ListItem from '../components/listItem';

class NBANewsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'NBA News',
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

  componentDidMount(){
    this.props.renderNBANews()
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

  _keyExtractor = (item, index) => item.title;

  _renderItem = ({item}) => (
        <ListItem
          pageName='NBAArticleDetailsScreen'
          item={item}
          navigation={this.props.navigation}
        />
    )

  render(){
    if(this.props.nbaArticles.length === 0){
      return (
        <View
         style={{ alignItems: 'center', justifyContent: 'center', flex:1 }}
        >
          <ActivityIndicator
           size="large" color="#0000"
          />
        </View>
      )
    }
    return (
      <View
       style={styles.container}
      >
        <FlatList
        data={this.props.nbaArticles}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
         />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const mapStateToProps = state => {
  return {
    nbaArticles: state.NBA.nbaArticles,
    newsError: state.NBA.newsError
  }
}

export default connect(mapStateToProps, actions)(NBANewsScreen)
