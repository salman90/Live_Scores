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
} from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  user: {},
  loading: false,
  error: '',
  signedUp: false,
}


export default (state = INITIAL_STATE, action) => {
  // console.log(action)
  switch (action.type) {
   case UPDATE_EMAIL:
     return { ...state, email: action.payload }
   case UPDATE_PASS:
    return { ...state, password: action.payload}
   case SIGNED_IN_USER_SUCCESSFULLY:
    return { ...state, user: action.payload, loading: false }
   case CREATED_USER_SUCCESSFULLY_IN_AUTH:
    return { ...state, user: action.payload, loading: false}
   case LOGED_IN_SUCCESSFULLY:
    return { ...state, user: action.payload }
  case SIGNING_IN_USER:
   return { ...state, loading: true}
  case SIGN_IN_FAILD:
   return {...state, error: action.payload, loading: false, email: '', password: '' }
  case CLEAR_ERROR_IN_AUTH:
   return { ...state, error: '' }
 case USER_IS_LOGGED_IN:
  // console.log(action.payload, 'user')
  return { ...state, user: action.payload, signedUp: true}
 case USER_IS_NOT_SIGN_UP:
 // console.log('in')
  return { ...state, user: null, signedUp: false }
    default:
   return state;
  }
}
