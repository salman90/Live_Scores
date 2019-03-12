import {
  UPDATE_EMAIL,
  UPDATE_PASS,
  SIGNED_IN_USER_SUCCESSFULLY,
  CREATED_USER_SUCCESSFULLY_IN_AUTH,
  LOGED_IN_SUCCESSFULLY,
  SIGNING_IN_USER,
  SIGN_IN_FAILD,
  CLEAR_ERROR_IN_AUTH,
  USER_IS_LOGGED_IN,
  USER_IS_NOT_SIGN_UP
} from './types'
import firebase from 'firebase'

export const updateEmail = (email) => {
  return {
    type: UPDATE_EMAIL,
    payload: email
  }
}

export const updatePassword = (pass) => {
  return {
    type: UPDATE_PASS,
    payload: pass
  }
}

export const signInWithEmail = (email, password, callback) => async dispatch => {
  dispatch({ type: SIGNING_IN_USER })
  firebase.auth().signInWithEmailAndPassword(email, password)
   .then((user) => {
     dispatch({ type: SIGNED_IN_USER_SUCCESSFULLY, payload: user })
     callback()
   })
   .catch(() =>{
     firebase.auth().createUserWithEmailAndPassword(email, password)
     .then((user) =>{
       dispatch({ type: CREATED_USER_SUCCESSFULLY_IN_AUTH, payload: user })
       callback()
     })
     .catch((error) => {
       let errorCode = error.code;
       let errorMessage = error.message;
         dispatch({ type: SIGN_IN_FAILD, payload: error.message })
          // if (errorCode == 'auth/weak-password') {
          //      alert('The password is too weak.');
          //  }else {
          //     alert(errorMessage);
        // }
     })
   })
}

export const logInUser = () => async dispatch => {
  // console.log('in logged in user')
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      // callback()
      dispatch({ type: USER_IS_LOGGED_IN, payload: user})
      // console.log(user)
    }else {
      dispatch({ type: USER_IS_NOT_SIGN_UP})
    }
  })
}

export const signUserOut = (callback) => async dispatch => {
  firebase.auth().signOut()
  callback()
  // console.log('sign out ksmksmqkqskxsmx')
}

export const clearEroorInAuth = () => async dispatch => {
  dispatch({ type: CLEAR_ERROR_IN_AUTH })
}

export const testing = () => async dispatch => {
  console.log('in testing')
}
