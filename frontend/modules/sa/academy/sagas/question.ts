import { takeEvery, call, put } from 'redux-saga/effects'
import {
  getQuestionSuccess,
  fetchQuestionsSuccess,
  GET_QUESTION_SUCCESS,
  FETCH_QUESTIONS_BY_ASSESSMENT,
  GET_QUESTION,
} from '../reducers/question'
import api from 'sa/core/api'
import { getUser } from 'sa/core/reducers/user'

function* getQuestion(action: any) {
  const { id } = action.payload
  const question = yield call(api.questions.get, id)
  yield put(getQuestionSuccess(id))
}

function* fetchQuestionsByAssessment(action: any) {
  const { assessment } = action.payload
  const questions = yield call(api.assessments.fetchQuestions, assessment)
  yield put(fetchQuestionsSuccess(questions))
}

function* questionSaga() {
  yield takeEvery(GET_QUESTION, getQuestion)
  yield takeEvery(FETCH_QUESTIONS_BY_ASSESSMENT, fetchQuestionsByAssessment)
}

export default questionSaga
