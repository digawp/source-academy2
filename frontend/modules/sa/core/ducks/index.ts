import { combineReducers, Reducer } from 'redux'
import { reducer as app } from './app'
import { reducer as auth } from './auth'
import { routerReducer } from 'react-router-redux'

export const createRootReducer = (asyncReducers: {[name:string]: Reducer<any>}) =>
  combineReducers({
    app,
    auth,
    routing: routerReducer,
    ...asyncReducers
  })

export const injectReducers = (store: any, reducers: {[name: string]: Reducer<any>}) => {
  for (let key of Object.keys(reducers)) {
    if (reducers.hasOwnProperty(key)) {
      store.asyncReducers[key] = reducers[key]
    }
  }
  store.replaceReducer(createRootReducer(store.asyncReducers))
}