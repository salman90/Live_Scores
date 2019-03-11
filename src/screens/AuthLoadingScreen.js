import React, { Component } from 'react';

import { View, Text, ActivityIndicator, Image } from 'react-native';

import { connect } from 'react-redux';

import * as actions from '../actions';

class AuthLoadingScreen extends Component {

  componentDidMount(){
    this.props.logInUser()
    // console.log('in auth loading')
  }

  static navigationOptions = ({  navigation }) => {
    return {
      headerTransparent: true,
    }
  }
  constructor(){
    super()
    // this._bootstrapAsync()
  }

  // _bootstrapAsync = async () => {
    // await this.props.testing()
  // }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps.user)
    this.props.navigation.navigate(nextProps.user? 'Main': 'Auth')
  }

  render(){
    return(
      <View
       style={{
         flex:1,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: '#ab372b',
       }}
      >
       <ActivityIndicator
        size="large"
        color="#0000ff"
       />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.Auth.user
  }
}

export default connect(mapStateToProps, actions)(AuthLoadingScreen)
