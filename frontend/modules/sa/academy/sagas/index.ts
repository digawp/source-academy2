import studentSaga from './student'
import assesssmentSaga from './assessment'
import inboxSaga from './inbox'
import announcementSaga from './announcement'

function* academySaga() {
  // Main Resource Sagas
  yield* studentSaga()
  yield* assesssmentSaga()
  yield* announcementSaga()

  // Page Specific Sagas
  yield* inboxSaga()
}

export default academySaga
