import studentSaga from './student'

function* academySaga() {
  yield* studentSaga()
}

export default academySaga
