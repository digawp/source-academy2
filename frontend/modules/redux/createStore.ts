import { History } from 'history'
import { compose,applyMiddleware, createStore, Store, Reducer } from 'redux'
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'
import createSagaMiddleware, { SagaIterator } from 'redux-saga'
import mainSaga from '../sagas'
import { makeRootReducer } from './reducers'

export interface IStore extends Store<any> {
  asyncReducers: { [name: string]: Reducer<any> }
}

export default (history: History, initialState = {}) => {
  // Setup Enhancers
  let composeEnchancers = compose

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof devToolsExtension === 'function') {
      composeEnchancers = devToolsExtension
    }
  }

  // Setup Middleware
  const sagaMiddleware = createSagaMiddleware()
  const routerMiddleware = createRouterMiddleware(history)

  // Create Store
  const store = <IStore> createStore(
    makeRootReducer({}),
    composeEnchancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware
      )
    )
  )

  store.asyncReducers = {}

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const newReducers = require('./reducers').default
        store.replaceReducer(newReducers)
      })
    }
  }

  // Run Saga
  sagaMiddleware.run(mainSaga)

  return store
}
