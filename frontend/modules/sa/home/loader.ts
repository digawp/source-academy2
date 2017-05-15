import { BundleLoader } from 'sa/core/types'

const loader: BundleLoader = (app, bundleLoaded) => 
  require.ensure([], () => {
    const HomeContainer = require('./containers/HomeContainer').default

    require('./styles/index.scss')

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

export default loader
