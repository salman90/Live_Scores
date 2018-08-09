import React, { Component } from 'react';
import {Text, View, TextInput, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as actions from '../actions';


const {height, width} = Dimensions.get('window');



class Auth extends Component {

  componentDidMount(){
    // const
    this.props.logInUser(() => {
      this.props.navigation.navigate('sports')
    })
  }

  signUp = () => {
    const { email, password } = this.props
    this.props.signInWithEmail(email, password, () => {
      this.props.navigation.navigate('sports')
    })
  }

  renderErorr = () => {
    if(this.props.error){
      Alert.alert(
        'Error',
        this.props.error,
        [
          {text: 'ok', onPress: () =>  this.props.clearEroorInAuth()}
        ]
      )
    }
  }

  render(){
     if(this.props.loading) {
       return (
         <View
          style={{ alignItems: 'center', justifyContent: 'center', flex:1 }}
         >
           <ActivityIndicator
            size="large"
            color="#0000ff"
           />
         </View>
       )
     }
    return(
      <View
       style={{ alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'column'}}
      >
       <View
        style={{ flexDirection: 'row'}}
       >
             <Icon
             type='font-awesome'
             name='envelope'
             size={25}
             iconStyle={{ marginRight: 10, marginTop: 10 }}
             />
             <TextInput
             style={{height: 40, borderColor: 'gray', borderBottomWidth: 1, width: width * 0.75 }}
             onChangeText={(email) => this.props.updateEmail(email)}
             value={this.props.email}
             autoCorrect={false}
             autoCapitalize='none'
             underlineColorAndroid='rgba(0,0,0,0)'
             />
       </View>
       <View
        style={{ flexDirection: 'row', marginTop: 10}}
       >
             <Icon
             type='font-awesome'
             name='unlock'
             size={25}
             iconStyle={{ marginRight: 10 }}
             />
             <TextInput
             style={{height: 40, borderColor: 'gray', borderBottomWidth: 1, width: width * 0.75 }}
             onChangeText={(pass) => this.props.updatePassword(pass)}
             value={this.props.password}
             autoCorrect={false}
             autoCapitalize='none'
             underlineColorAndroid='rgba(0,0,0,0)'
             secureTextEntry={true}
             />
       </View>
       <View
        style={{ alignItems: 'center', justifyContent: 'center'}}
       >
          <Button
             title='Sign UP'
             onPress={this.signUp}
             buttonStyle={{marginTop: 15, width: 200, height: 50, borderRadius: 8}}
          />
       </View>
       {this.renderErorr()}
      </View>
    )
  }
}


const mapStateToProps =  state => {
  return {
    email: state.Auth.email,
    password: state.Auth.password,
    user: state.Auth.user,
    loading: state.Auth.loading,
    error: state.Auth.error
  }
}

export default connect(mapStateToProps, actions)(Auth);
