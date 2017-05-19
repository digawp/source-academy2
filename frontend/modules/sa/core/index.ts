import { combineReducers, Reducer, Store, compose,
  createStore, applyMiddleware } from 'redux'
import { History } from 'history'
import {
  routerReducer,
  routerMiddleware as createRouterMiddleware,
} from 'react-router-redux'
import createSagaMiddleware, { SagaIterator, SagaMiddleware } from 'redux-saga'
import createBrowserHistory from 'history/createBrowserHistory'

import coreReducers from './reducers'
import mainSaga from './sagas'
import { IAppDelegate, AsyncStore } from './types'

export default class App implements IAppDelegate {
  store: AsyncStore
  sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware()
  history: History = createBrowserHistory()

  private coreReducers: { [name: string]: Reducer<any> } = coreReducers

  constructor() {
    // Setup Enhancers
    let composeEnchancers = compose

    if (process.env.NODE_ENV === 'development') {
      const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      if (typeof devToolsExtension === 'function') {
        composeEnchancers = devToolsExtension
      }
    }

    // Setup Middleware
    const routerMiddleware = createRouterMiddleware(this.history)

    // Create Store
    const store = createStore(
      this.createRootReducer({}),
      composeEnchancers(
        applyMiddleware(
          this.sagaMiddleware,
          routerMiddleware,
        ),
      ),
    ) as AsyncStore

    store.asyncReducers = {}
    store.asyncSagas = []

    this.store = store

    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        module.hot.accept('./reducers', () => {
          const coreReducers = require('./reducers').default
          this.coreReducers = coreReducers
          store.replaceReducer(this.createRootReducer(store.asyncReducers))
        })
      }
    }

    // Run Saga
    this.injectSaga('mainSaga', mainSaga)
  }

  createRootReducer(asyncReducers: {[name: string]: Reducer<any>}) {
    return combineReducers({
      ...this.coreReducers,
      ...asyncReducers,
      routing: routerReducer,
    })
  }

  injectReducers(reducers: {[name: string]: Reducer<any>}) {
    for (const key of Object.keys(reducers)) {
      this.store.asyncReducers[key] = reducers[key]
    }
    this.store.replaceReducer(
      this.createRootReducer(this.store.asyncReducers),
    )
  }

  injectSaga(key: string, saga: () => Iterator<any>) {
    if (this.store.asyncSagas.find(k => k === key)) {
      return
    }
    this.store.asyncSagas = [...this.store.asyncSagas, key]
    this.sagaMiddleware.run(saga)
  }
}
