import { delay } from 'redux-saga'
import { select, takeEvery, call, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, User, Student } from 'sa/core/types'
import { ACADEMY_BUNDLE_LOADED } from 'sa/core/util'
import { setCurrentStudent, GET_CURRENT_STUDENT } from '../reducers/currentStudent'
import { State } from '../types'
import api from 'sa/core/api'

export function* ensureCurrentStudentExists() {
  // Ensures currentUser and currentStudent is defined
  while (true) {
    const currentStudent: Student = yield select((state: State) => state.currentStudent)
    const currentUser: User = yield select((state: State) => state.auth.currentUser)
    if (currentStudent || (currentUser && currentUser.role !== 'student')) {
      break
    } else {
      yield delay(100)
    }
  }
}

function* getCurrentStudent() {
  const currentUser: User = yield select((state: any) => state.auth.currentUser)
  const currentStudent = yield call(api.students.getByUser, currentUser.id)
  yield put(setCurrentStudent(currentStudent))
}

function* studentSaga(): any {
  yield takeEvery([
    ACADEMY_BUNDLE_LOADED,
    GET_CURRENT_STUDENT,
    LOCATION_CHANGE,
  ], getCurrentStudent)
}

export default studentSaga
