import { Store } from 'redux'
import { IAppDelegate } from 'sa/core/types'
import { academyBundleLoaded } from 'sa/core/util'
import { reducer as inbox } from './ducks/inbox'
import { reducer as assessment } from './ducks/assessment'
import { reducer as currentStudent, getCurrentStudent } from './ducks/currentStudent'
import academySaga from './sagas'

export default (app: IAppDelegate) => {
  require.ensure([], () => {
    const AcademyContainer = require('./containers/AcademyContainer').default

    require("./styles/index.scss")

    const reducers = { inbox, currentStudent, assessment }

    app.injectReducers(app.store, reducers)
    app.injectSaga(app.store, 'academy', academySaga)

    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        module.hot.accept('./containers/AcademyContainer', () => {
          const NewContainer = require('./containers/AcademyContainer').default
          app.bundleLoaded(NewContainer)
        });
        ['inbox', 'assessment', 'currentStudent'].forEach(key => {
          module.hot.accept(`./ducks/${key}`, () => {
            const { reducer } = require(`./ducks/${key}`)
            app.store.asyncReducers[key] = reducer
            app.store.replaceReducer(app.createRootReducer(app.store.asyncReducers))
          })
        })
      }
    }
    app.store.dispatch(academyBundleLoaded())
    app.bundleLoaded(AcademyContainer)
  }, 'academy')
}