import { takeEvery } from 'redux-saga/effects'
import authSaga from './auth'
import userSaga from './user'

function* mainSaga() {
  yield* authSaga()
  yield* userSaga()
}

export default mainSaga
