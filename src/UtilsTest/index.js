import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers/index.js'
import { middlewares } from '../createStore.js'


export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
    return createStoreWithMiddleware(reducer, initialState)
}