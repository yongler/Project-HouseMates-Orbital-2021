import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })
const middlewares = [ thunk ]

const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(...middlewares))
)

export default store