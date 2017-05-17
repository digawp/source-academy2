import { select, takeEvery, call, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, IUser } from 'sa/core/types'
import {
  fetchAssessmentsSuccess,
  getAssessmentSuccess,
  GET_ASSESSMENT,
  FETCH_ASSESSMENTS
} from '../reducers/assessment'

declare const CURRENT_API: API

function* doFetchAssessments() {
  const assessments = yield call(CURRENT_API.assessments.fetch)
  yield put(fetchAssessmentsSuccess(assessments))
}

function* doGetAssessment(action: any) {
  const { id } = action.payload
  const assessment = yield call(CURRENT_API.assessments.get, id)
  yield put(getAssessmentSuccess(assessment))
}

function* assessmentsSaga(): any {
  yield takeEvery(FETCH_ASSESSMENTS, doFetchAssessments)
  yield takeEvery(GET_ASSESSMENT, doGetAssessment)
}

export default assessmentsSaga