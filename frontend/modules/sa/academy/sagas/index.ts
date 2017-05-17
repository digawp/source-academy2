import studentSaga from './student'
import assesssmentSaga from './assessment'
import inboxSaga from './inbox'
import announcementSaga from './announcement'
import happeningSaga from './happening'
import journalSaga from './journal'
import gradingSaga from './grading'

function* academySaga() {
  // Main Resource Sagas
  yield* studentSaga()
  yield* assesssmentSaga()
  yield* announcementSaga()
  yield* happeningSaga()
  yield* gradingSaga()

  // Page Specific Sagas
  yield* inboxSaga()
  yield* journalSaga()
}

export default academySaga
