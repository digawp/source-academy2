import { takeEvery, select, call, put } from 'redux-saga/effects'
import { API } from 'sa/core/types'
import { State } from '../types'
import { getGradingSuccess, GET_GRADING } from '../reducers/grading'
import { getGrading } from '../reducers/grading'

declare const CURRENT_API: API

function* doGetGrading(action: any) {
  const { assessment } = action.payload
  const { id } = yield select((state: State) => state.currentStudent)
  const grading = yield call(
    CURRENT_API.gradings.getByAssessment,
    assessment,
    id,
  )
  yield put(getGradingSuccess(grading))
}

function* gradingSaga(): any {
  yield takeEvery(GET_GRADING, doGetGrading)
}

export default gradingSaga
