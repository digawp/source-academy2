import studentSaga from './student'
import assesssmentSaga from './assessment'
import inboxSaga from './inbox'

function* academySaga() {
  // Main Resource Sagas
  yield* studentSaga()
  yield* assesssmentSaga()

  // Page Specific Sagas
  yield* inboxSaga()
}

export default academySaga
