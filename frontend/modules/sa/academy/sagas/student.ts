import { select, takeEvery, call, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, IUser } from 'sa/core/types'
import { setCurrentStudent, GET_CURRENT_STUDENT } from '../ducks/currentStudent'

declare const CURRENT_API: API

function* getCurrentStudent() {
  const currentUser: IUser = yield select((state: any) => state.auth.currentUser)
  const currentStudent = yield call(CURRENT_API.student.getByUser, currentUser.id)
  yield put(setCurrentStudent(currentStudent))
}

function* studentSaga(): any {
  yield takeEvery(GET_CURRENT_STUDENT, getCurrentStudent)
  yield takeEvery(LOCATION_CHANGE, getCurrentStudent)
}

export default studentSaga