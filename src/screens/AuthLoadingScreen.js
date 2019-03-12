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
      headerStyle: {
        elevation: 0,
        shadowColor: 'transparent',
        // backgroundColor: '#fff',
        borderBottomWidth: 0,
      },
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
    console.log('should update')
    // console.log(nextProps.user, 'user props')
    this.props.navigation.navigate(nextProps.user? 'Main': 'Auth')
  }

  render(){
    console.log(this.props.signedUp, 'signedUp')
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
    user: state.Auth.user,
    signedUp: state.Auth.signedUp,
  }
}

export default connect(mapStateToProps, actions)(AuthLoadingScreen)
