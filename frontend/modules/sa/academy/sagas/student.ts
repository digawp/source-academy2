import { select, takeEvery, call, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, User } from 'sa/core/types'
import { ACADEMY_BUNDLE_LOADED } from 'sa/core/util'
import { setCurrentStudent, GET_CURRENT_STUDENT } from '../reducers/currentStudent'
import api from 'sa/core/api'

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
