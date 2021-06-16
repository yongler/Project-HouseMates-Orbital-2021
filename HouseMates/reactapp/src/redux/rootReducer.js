import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import formReducer from './form/reducer'

const rootReducer = combineReducers({ 
  auth: authReducer,
  form: formReducer
})

export default rootReducer