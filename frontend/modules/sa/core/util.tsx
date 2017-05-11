import * as React from 'react'
import { combineReducers, Reducer, Store } from 'redux'
import { routerReducer } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { reducer as app } from './ducks/app'

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

export function createLink(
  to: string,
  classNames: string,
  isActive: boolean,
  children: React.ReactNode
) {
  const finalClassNames = classNames + (isActive ? ' pt-active' : '')
  return <Link className={finalClassNames} to={to} children={children}/>
}