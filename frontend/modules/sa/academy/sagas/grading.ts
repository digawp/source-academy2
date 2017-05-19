import { takeEvery, select, call, put } from 'redux-saga/effects'
import { API } from 'sa/core/types'
import { State } from '../types'
import { getGradingSuccess, GET_GRADING } from '../reducers/grading'
import api from 'sa/core/api'

function* getGrading(action: any) {
  const { assessment, student } = action.payload
  const grading = yield call(
    api.gradings.getByAssessment,
    assessment,
    student,
  )
  yield put(getGradingSuccess(grading))
}

function* gradingSaga(): any {
  yield takeEvery(GET_GRADING, getGrading)
}

export default gradingSaga
