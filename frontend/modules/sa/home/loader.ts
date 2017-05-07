import { IAppDelegate } from 'sa/core/types'

import './styles/index.scss'

export default ({ injectReducers, store, bundleLoaded}: IAppDelegate) => {
  require.ensure([], () => {
    const HomeContainer = require('./containers/HomeContainer').default

    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        module.hot.accept('./containers/HomeContainer', () => {
          const NewHomeContainer = require('./containers/HomeContainer').default
          bundleLoaded(NewHomeContainer)
        })
      }
    }
    
    bundleLoaded(HomeContainer)
  }, 'home')
}