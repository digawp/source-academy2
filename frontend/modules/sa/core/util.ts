import { combineReducers, Reducer, Store } from 'redux'
import { routerReducer } from 'react-router-redux'
import app from './reducers/appReducer'

export const makeRootReducer = (asyncReducers: {[name:string]: Reducer<any>}) =>
  combineReducers({
    app,
    routing: routerReducer,
    ...asyncReducers
  })

export const injectReducers = (store: any, reducers: {[name: string]: Reducer<any>}) => {
  for (let key of Object.keys(reducers)) {
    if (reducers.hasOwnProperty(key)) {
      store.asyncReducers[key] = reducers[key]
    }
  }
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}