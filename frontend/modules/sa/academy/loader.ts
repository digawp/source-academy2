import { Store } from 'redux'
import { IAppDelegate } from 'sa/core/types'
import { reducer as inbox } from './ducks/inbox'
import { reducer as currentStudent, getCurrentStudent } from './ducks/currentStudent'
import academySaga from './sagas'

export default (app: IAppDelegate) => {
  require.ensure([], () => {
    const AcademyContainer = require('./containers/AcademyContainer').default

    require("./styles/index.scss")

    const reducers = { inbox, currentStudent }

    app.injectReducers(app.store, reducers)
    app.injectSaga(app.store, 'academy', academySaga)

    if (process.env.NODE_ENV === 'development') {
      if (module.hot) {
        module.hot.accept('./containers/AcademyContainer', () => {
          const NewContainer = require('./containers/AcademyContainer').default
          app.bundleLoaded(NewContainer)
        })
        module.hot.accept('./ducks/inbox', () => {
          const { inbox } = require('./ducks/inbox')
          app.store.asyncReducers.inbox = inbox
          app.store.replaceReducer(app.createRootReducer(app.store.asyncReducers))
        })
        module.hot.accept('./ducks/currentStudent', () => {
          const { currentStudent } = require('./ducks/currentStudent')
          app.store.asyncReducers.currentStudent = currentStudent
          app.store.replaceReducer(app.createRootReducer(app.store.asyncReducers))
        })
      }
    }

    // Replay authenticate success
    const currentUser = app.store.getState().auth.currentUser
    if (currentUser && currentUser.role === 'student') {
      app.store.dispatch(getCurrentStudent())
    }
    
    app.bundleLoaded(AcademyContainer)
  }, 'academy')
}