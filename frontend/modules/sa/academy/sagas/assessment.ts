import { delay, Effect } from 'redux-saga'
import { select, takeEvery, call, put, all } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, User, Student, Assessment } from 'sa/core/types'
import {
  fetchAssessmentsSuccess,
  getAssessmentSuccess,
  GET_ASSESSMENT,
  FETCH_ASSESSMENTS,
} from '../reducers/assessment'
import { fetchAnswersByAssessment } from '../reducers/answer'
import { fetchQuestionsByAssessment } from '../reducers/question'
import { getGrading } from '../reducers/grading'
import { State } from '../types'
import { ensureCurrentStudentExists } from './student'
import api from 'sa/core/api'

function* fetchAssessments() {
  const assessments = yield call(api.assessments.fetch)
  const user: User = yield select((state: State) => state.auth.currentUser)
  if (user.role === 'student') {
    const student: Student = yield select((state: State) => state.currentStudent)
    yield all(assessments.map((a: Assessment) => put(getGrading(a.id, student.id))))
  }
  yield put(fetchAssessmentsSuccess(assessments))
}

function* getAssessment(action: any) {
  const { id, withQuestions, answerOfStudent } = action.payload
  const assessment = yield call(api.assessments.get, id)
  const effects: Effect[] = []
  const user: User = yield select((state: State) => state.auth.currentUser)

  if (user.role === 'student') {
    yield* ensureCurrentStudentExists()
    const student: Student = yield select((state: State) => state.currentStudent)
    effects.push(put(getGrading(assessment.id, student.id)))

  } else {
    const query = new URLSearchParams(location.search)
    const student = query.get('student')
    if (student) {
      effects.push(put(getGrading(assessment.id, parseInt(student, 10))))
    }
  }

  if (withQuestions) {
    effects.push(put(fetchQuestionsByAssessment(id)))
  }

  if (typeof answerOfStudent !== 'undefined') {
    effects.push(put(fetchAnswersByAssessment(id, answerOfStudent)))
  }

  yield all(effects)
  yield put(getAssessmentSuccess(assessment))
}

function* assessmentsSaga() {
  yield takeEvery(FETCH_ASSESSMENTS, fetchAssessments)
  yield takeEvery(GET_ASSESSMENT, getAssessment)
}

export default assessmentsSaga
