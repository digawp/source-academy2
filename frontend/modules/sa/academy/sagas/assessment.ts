import { select, takeEvery, call, put, all } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, IUser, IAssessment } from 'sa/core/types'
import {
  fetchAssessmentsSuccess,
  getAssessmentSuccess,
  GET_ASSESSMENT,
  FETCH_ASSESSMENTS
} from '../reducers/assessment'
import { getGrading } from '../reducers/grading'

declare const CURRENT_API: API

function* doFetchAssessments() {
  const assessments = yield call(CURRENT_API.assessments.fetch)
  yield all(assessments.map((a: IAssessment) => put(getGrading(a.id))))
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