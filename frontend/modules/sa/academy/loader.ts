import { Store } from 'redux'
import { IAppDelegate } from 'sa/core/types'

export default ({injectReducers, store, bundleLoaded}: IAppDelegate) => {
  require.ensure([], () => {
    const AcademyContainer = require('./containers/AcademyContainer').default

    require("./styles/index.scss")

    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        module.hot.accept('./containers/AcademyContainer', () => {
          const NewContainer = require('./containers/AcademyContainer').default
          bundleLoaded(NewContainer)
        })
      }
    }
    
    bundleLoaded(AcademyContainer)
  }, 'academy')
}