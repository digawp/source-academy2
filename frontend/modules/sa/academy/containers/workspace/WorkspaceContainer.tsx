import { values, sortBy } from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { State } from '../../types'
import { Answer, Question } from 'sa/core/types'
import Workspace, { OwnProps } from '../../components/workspace/Workspace'

const getAssessments = (state: State) => state.assessments
const getQuestions = (state: State) => state.questions
const getAnswers = (state: State) => state.answers
const getCurrentStudent = (state: State) => state.currentStudent

const selectAssessment = (id: number) =>
  createSelector(
    getAssessments,
    (assessments) => values(assessments).find(a => a.id === id),
  )

const selectQuestionsAndAnswers = (assessment: number) =>
  createSelector(
    getQuestions,
    getAnswers,
    getCurrentStudent,
    (questions, answers, student) => {
      const assessmentQuestions = sortBy(
        values(questions).filter(q => q.assessment === assessment),
        'order',
      )
      const allAnswers = values(answers)
      const assessmentAnswers = assessmentQuestions
        .map(q => allAnswers.find(a =>
          a.question === q.id && a.student === student.id))
      return {
        questions: assessmentQuestions,
        answers: assessmentAnswers,
      }
    },
  )

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  if (ownProps.type === 'assessment') {
    const assessment = selectAssessment(ownProps.id)(state)
    const { answers, questions } = selectQuestionsAndAnswers(ownProps.id)(state)
    return {
      ...ownProps,
      assessment,
      answers,
      questions,
    }
  } else {
    return ownProps
  }
}

export default connect(mapStateToProps)(Workspace)
