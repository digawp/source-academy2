import studentSaga from './student'
import assesssmentSaga from './assessment'
import inboxSaga from './inbox'
import announcementSaga from './announcement'
import happeningSaga from './happening'

function* academySaga() {
  // Main Resource Sagas
  yield* studentSaga()
  yield* assesssmentSaga()
  yield* announcementSaga()
  yield* happeningSaga()

  // Page Specific Sagas
  yield* inboxSaga()
}

export default academySaga
