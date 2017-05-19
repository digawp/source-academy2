import { select, takeEvery, call, put, all } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, User, Assessment } from 'sa/core/types'
import {
  fetchAssessmentsSuccess,
  getAssessmentSuccess,
  GET_ASSESSMENT,
  FETCH_ASSESSMENTS,
} from '../reducers/assessment'
import { getGrading } from '../reducers/grading'
import api from 'sa/core/api'

function* doFetchAssessments() {
  const assessments = yield call(api.assessments.fetch)
  yield all(assessments.map((a: Assessment) => put(getGrading(a.id))))
  yield put(fetchAssessmentsSuccess(assessments))
}

function* doGetAssessment(action: any) {
  const { id } = action.payload
  const assessment = yield call(api.assessments.get, id)
  yield put(getAssessmentSuccess(assessment))
}

function* assessmentsSaga(): any {
  yield takeEvery(FETCH_ASSESSMENTS, doFetchAssessments)
  yield takeEvery(GET_ASSESSMENT, doGetAssessment)
}

export default assessmentsSaga
