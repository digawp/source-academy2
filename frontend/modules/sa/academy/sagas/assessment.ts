import { select, takeEvery, call, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, IUser } from 'sa/core/types'
import {
  fetchAssessmentsSuccess,
  FETCH_ASSESSMENTS,
  FETCH_ASSESSMENTS_SUCCESS
} from '../reducers/assessment'

declare const CURRENT_API: API

function* doFetchAssessments() {
  const assessments = yield call(CURRENT_API.assessment.fetch)
  yield put(fetchAssessmentsSuccess(assessments))
}

function* assessmentsSaga(): any {
  yield takeEvery(FETCH_ASSESSMENTS, doFetchAssessments)
}

export default assessmentsSaga