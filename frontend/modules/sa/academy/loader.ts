import { Store } from 'redux'
import { IAppDelegate } from 'sa/core/types'
import { reducer as inbox } from './ducks/inbox'

export default ({injectReducers, store, bundleLoaded, createRootReducer}: IAppDelegate) => {
  require.ensure([], () => {
    const AcademyContainer = require('./containers/AcademyContainer').default

    require("./styles/index.scss")

    const reducers = { inbox }

    injectReducers(store, reducers)

    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        module.hot.accept('./containers/AcademyContainer', () => {
          const NewContainer = require('./containers/AcademyContainer').default
          bundleLoaded(NewContainer)
        })
        module.hot.accept('./ducks/inbox', () => {
          const { inbox } = require('./ducks/inbox')
          store.asyncReducers.inbox = inbox
          store.replaceReducer(createRootReducer(store.asyncReducers))
        })
      }
    }

    
    bundleLoaded(AcademyContainer)
  }, 'academy')
}