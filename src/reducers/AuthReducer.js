import {
  UPDATE_EMAIL,
  UPDATE_PASS,
  SIGNED_IN_USER_SUCCESSFULLY,
  CREATED_USER_SUCCESSFULLY_IN_AUTH,
  LOGED_IN_SUCCESSFULLY,
  SIGNING_IN_USER,
  SIGN_IN_FAILD,
} from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  loading: false,
  error: '',
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
   return {...state, error: action.payload, loading: false }
    default:
   return state;
  }
}
