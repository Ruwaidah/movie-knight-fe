import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducer from './reducers/index'


export const middlewares = [ReduxThunk]
export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
export const store = createStoreWithMiddleware(reducer)

