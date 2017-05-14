import { combineReducers, Reducer } from 'redux'
import { routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as app } from './app'
import { reducer as auth } from './auth'

export const sagaMiddleware = createSagaMiddleware()

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

export const injectSaga = (store: any, key: string, saga: any) => {
  if (store.asyncSagas.includes(key)) return

  store.asyncSagas = [...store.asyncSagas, key]
  sagaMiddleware.run(saga)
}