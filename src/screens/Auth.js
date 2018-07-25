import React, { Component } from 'react';
import {Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements'
import firebase from 'firebase';

class Auth extends Component {
  state = {
    email: '',
    password: '',
  }
  componentWillMount(){
    console.log(firebase.auth().currentuser)
    // firebase.auth().createUserWithEmailAndPassword('salmansalem@gmail.com','12345678')
  }

  renderSignIn(){
    const email = this.state.email
    const password = this.state.password
    firebase.auth().signInWithEmailAndPassword(email, password)
     .then(() =>{
      console.log(firebase.auth().currentuser)
       console.log('sign in')
     })
     .catch( (error) => {
       firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {

          console.log('create account and signed in')
          // firebase.auth()
        })
        .catch(() =>{
          console.log(error)
        })
     })
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    //     // Handle Errors here.
    //     console.log(error)
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(error.message)
    //     // ...
    // });
  }

  render(){
    const currentUser = firebase.auth().currentUser
    console.log(currentUser)
    return(
      <View
       style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}
      >
       <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
       >
          <Text>
           Email
          </Text>
          <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}}
          onChangeText={(email) => this.setState({ email: email})}
          value={this.state.email}
          />
          <Text>password</Text>
           <TextInput
           style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}}
           onChangeText={(pass) => this.setState({ password: pass})}
           value={this.state.password}
           />
           <Button
             buttonStyle={{ width: 200, height: 40, marginTop: 10}}
             title='Sign In'
             onPress={this.renderSignIn.bind(this)}
           />

       </View>
      </View>
    )
  }
}

export default Auth;
