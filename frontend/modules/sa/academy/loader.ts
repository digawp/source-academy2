import { BundleLoader } from 'sa/core/types'
import { academyBundleLoaded } from 'sa/core/util'

const loader: BundleLoader = (app, bundleLoaded) => {
  require.ensure([], () => {
    const AcademyContainer = require('./containers/AcademyContainer').default
    const academySaga = require('./sagas')
    const reducers = require('./reducers')

    require("./styles/index.scss")

    app.injectReducers(reducers)
    app.injectSaga('academy', academySaga)

    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        module.hot.accept('./containers/AcademyContainer', () => {
          const NewContainer = require('./containers/AcademyContainer').default
          bundleLoaded(NewContainer)
        });
        module.hot.accept(`./reducers/`, () => {
          const reducers = require(`./reducers`).default
          app.injectReducers(reducers)
        })
      }
    }

    app.store.dispatch(academyBundleLoaded())

    bundleLoaded(AcademyContainer)
  }, 'academy')
}

export default loader
