import { Store } from 'redux'
import { BundleLoader } from 'sa/core/types'
import { academyBundleLoaded } from 'sa/core/util'
import { reducer as assessment } from './reducers/assessment'
import { reducer as currentStudent } from './reducers/currentStudent'
import { reducer as announcement } from './reducers/announcement'
import academySaga from './sagas'

const loader: BundleLoader = (app, bundleLoaded) => {
  require.ensure([], () => {
    const AcademyContainer = require('./containers/AcademyContainer').default

    require("./styles/index.scss")

    const reducers = { currentStudent, assessment, announcement }

    app.injectReducers(reducers)
    app.injectSaga('academy', academySaga)

    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        module.hot.accept('./containers/AcademyContainer', () => {
          const NewContainer = require('./containers/AcademyContainer').default
          bundleLoaded(NewContainer)
        });
        ['inbox', 'assessment', 'currentStudent', 'announcement'].forEach(key => {
          module.hot.accept(`./reducers/${key}`, () => {
            const { reducer } = require(`./reducers/${key}`)
            app.injectReducers({ [key]: reducer })
          })
        })
      }
    }

    app.store.dispatch(academyBundleLoaded())

    bundleLoaded(AcademyContainer)
  }, 'academy')
}

export default loader
