import { History } from 'history'
import { compose,applyMiddleware, createStore, Store, Reducer } from 'redux'
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'
import { AsyncStore } from './types'
import mainSaga from './sagas'
import { sagaMiddleware, createRootReducer, injectSaga } from './ducks'
import { isProtectedPath } from './util'

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
  const routerMiddleware = createRouterMiddleware(history)

  // Create Store
  const store = <AsyncStore> createStore(
    createRootReducer({}),
    composeEnchancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware
      )
    )
  )

  store.asyncReducers = {}
  store.asyncSagas = []

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./ducks', () => {
        const createRootReducer = require('./ducks').createRootReducer
        store.replaceReducer(createRootReducer(store.asyncReducers))
      })
    }
  }

  // Run Saga
  injectSaga(store, 'mainSaga', mainSaga)

  // Redirect to home if not authenticated
  history.listen(location => {
    if (isProtectedPath(location.pathname)) {
      if(!store.getState().auth.isAuthenticated) {
        setTimeout(() => {
          if(!store.getState().auth.isAuthenticated) {
            history.push('/')
          }
        }, 3000)
      }
    }
  })

  return store
}
