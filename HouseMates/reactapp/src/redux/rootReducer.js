import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import formReducer from './form/reducer'
import postReducer from './post/reducer'

const rootReducer = combineReducers({ 
  auth: authReducer,
  form: formReducer,
  post: postReducer,
})

export default rootReducer