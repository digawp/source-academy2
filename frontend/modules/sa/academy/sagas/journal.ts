import { takeEvery, put, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { ACADEMY_BUNDLE_LOADED } from 'sa/core/util'
import { State } from '../types'
import { User, Student } from 'sa/core/types'
import { ensureCurrentStudentExists } from './student'

import {
  fetchAssessments,
  getAssessment,
} from '../reducers/assessment'

function* fetchRequiredResource() {
  const locations = location.pathname.split('/')
  const isInsideJournal =
    locations[1] === 'academy' && locations[2] === 'journal'

  if (isInsideJournal) {
    const tab = locations[3]
    if (tab === 'assessments') {
      yield put(fetchAssessments())
    } else if (tab === 'workspaces') {
      const assessmentId = parseInt(locations[4], 10)
      const user: User = yield select((state: State) => state.auth.currentUser)
      if (user.role === 'student') {
        yield *ensureCurrentStudentExists()
        const currentStudent: Student = yield select((state: State) => state.currentStudent)
        yield put(getAssessment(assessmentId, true, currentStudent.id))
      } else {
        const student = new URLSearchParams(location.search).get('student')
        yield put(getAssessment(assessmentId, true, parseInt(student!, 10)))
      }
    }
  }
}

function* journalSaga() {
  yield takeEvery([
    ACADEMY_BUNDLE_LOADED,
    LOCATION_CHANGE,
  ], fetchRequiredResource)
}

export default journalSaga
