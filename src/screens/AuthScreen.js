import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert, Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as actions from '../actions';


const {height, width} = Dimensions.get('window');



class AuthScreen extends Component {
  static navigationOptions = ({  navigation }) => {
    return {
      headerTransparent: true,
    }
  }
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount(){
    this.props.logInUser(() => {
      this.props.navigation.navigate('sports')
    })
  }

  signUp() {
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
      <KeyboardAvoidingView
           style={styles.keyBoardAvoidStyle}
           behavior="padding"
        >
      <View
       style={styles.containerStyle}
      >
      <View>
        <Image
         source={require('../images/logo.jpg')}
         style={styles.imageStyle}
        />
      </View>
       <View
        style={styles.TextInputContainerStyle}
       >
             <Icon
             type='font-awesome'
             name='envelope'
             size={25}
             iconStyle={styles.envelopeIconStyle}
             />
             <TextInput
             style={styles.textInputStyle}
             onChangeText={(email) => this.props.updateEmail(email)}
             value={this.props.email}
             autoCorrect={false}
             autoCapitalize='none'
             underlineColorAndroid='rgba(0,0,0,0)'
             />
       </View>
       <View
        style={[styles.TextInputContainerStyle, {marginTop: 10}]}
       >
             <Icon
             type='font-awesome'
             name='unlock'
             size={25}
             iconStyle={{ marginRight: 10 }}
             />
             <TextInput
             style={styles.textInputStyle}
             onChangeText={(pass) => this.props.updatePassword(pass)}
             value={this.props.password}
             autoCorrect={false}
             autoCapitalize='none'
             underlineColorAndroid='rgba(0,0,0,0)'
             secureTextEntry={true}
             />
       </View>
       <View
        style={styles.buttonContainer}
       >
          <Button
             title='Sign UP'
             onPress={this.signUp}
             buttonStyle={styles.buttonStyle}
          />
       </View>
       {this.renderErorr()}
      </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardAvoidStyle: {
    flex: 1
  },
  containerStyle: {
    alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#ab372b',
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
  TextInputContainerStyle: {
    flexDirection: 'row',
  },
  envelopeIconStyle: {
    marginRight: 10,
    marginTop: 10
  },
  textInputStyle: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    width: width * 0.75
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    marginTop: 15,
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#000'
  },
})


const mapStateToProps =  state => {
  return {
    email: state.Auth.email,
    password: state.Auth.password,
    user: state.Auth.user,
    loading: state.Auth.loading,
    error: state.Auth.error
  }
}

export default connect(mapStateToProps, actions)(AuthScreen);
