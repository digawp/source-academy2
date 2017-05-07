import { combineReducers, Reducer, Store } from 'redux'
import { routerReducer } from 'react-router-redux'
import app from './appReducer'

export const makeRootReducer = (asyncReducers: {[name:string]: Reducer<any>}) =>
  combineReducers({
    app,
    routing: routerReducer,
    ...asyncReducers
  })

export const injectReducer = (store: any, { key, reducer }: 
  { key: string, reducer: Reducer<any> }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}