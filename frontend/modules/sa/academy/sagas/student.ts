import { select, takeEvery, call, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, IUser } from 'sa/core/types'
import { ACADEMY_BUNDLE_LOADED } from 'sa/core/util'
import { setCurrentStudent, GET_CURRENT_STUDENT } from '../reducers/currentStudent'

declare const CURRENT_API: API

function* getCurrentStudent() {
  const currentUser: IUser = yield select((state: any) => state.auth.currentUser)
  const currentStudent = yield call(CURRENT_API.students.getByUser, currentUser.id)
  yield put(setCurrentStudent(currentStudent))
}

function* studentSaga(): any {
  yield takeEvery([
    ACADEMY_BUNDLE_LOADED,
    GET_CURRENT_STUDENT,
    LOCATION_CHANGE
  ], getCurrentStudent)
}

export default studentSaga