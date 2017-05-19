import { takeEvery, call, put, select } from 'redux-saga/effects'
import {
  getAnswerSuccess,
  fetchAnswersSuccess,
  GET_ANSWER_SUCCESS,
  GET_ANSWER,
  FETCH_ANSWERS_BY_ASSESSMENT,
} from '../reducers/answer'
import { State } from '../types'
import api from 'sa/core/api'
import { getUser } from 'sa/core/reducers/user'

function* getAnswer(action: any) {
  const { id } = action.payload
  const answer = yield call(api.answers.get, id)
  yield put(getAnswerSuccess(id))
}

function* fetchAnswersByAssessment(action: any) {
  const { assessment, student } = action.payload
  const answers = yield call(api.assessments.fetchAnswers, assessment, student)
  yield put(fetchAnswersSuccess(answers))
}

function* answerSaga() {
  yield takeEvery(GET_ANSWER, getAnswer)
  yield takeEvery(FETCH_ANSWERS_BY_ASSESSMENT, fetchAnswersByAssessment)
}

export default answerSaga
