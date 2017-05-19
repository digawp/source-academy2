import { values, sortBy } from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { State } from '../../types'
import { Answer, Question } from 'sa/core/types'
import Workspace, { OwnProps } from '../../components/workspace/Workspace'
import { withStudent } from '../../decorators'

const getAssessments = (state: State) => state.assessments
const getQuestions = (state: State) => state.questions
const getAnswers = (state: State) => state.answers
const getCurrentStudent = (state: State) => state.currentStudent
const getGradings = (state: State) => state.gradings

const selectAssessment = (id: number) =>
  createSelector(
    getAssessments,
    (assessments) => values(assessments).find(a => a.id === id),
  )

const selectGrading = (assessment: number) =>
  createSelector(
    getGradings,
    getCurrentStudent,
    (gradings, currentStudent) => values(gradings).find(g =>
      g.assessment === assessment && g.student === currentStudent.id),
  )

const selectQuestions = (assessment: number) =>
  createSelector(
    getQuestions,
    (questions) => sortBy(
      values(questions).filter(q => q.assessment === assessment),
      q => q.order,
    ),
  )

const selectAnswers = (questions: Question[]) =>
  createSelector(
    getAnswers,
    getCurrentStudent,
    (answers, currentStudent) =>
      sortBy(
        values(answers).filter(a => questions.find(q => q.id === a.question)
          && a.student === currentStudent.id),
        a => questions.find(q => a.question === q.id)!.order,
      ),
   )

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const { location } = state.routing
  const paths = location!.pathname.split('/')
  const isJournal = paths[2] === 'journal'

  if (isJournal) {
    const id = parseInt(paths[paths.length - 1], 10)
    const assessment = selectAssessment(id)(state)
    const questions = selectQuestions(id)(state)
    const grading = selectGrading(id)(state)
    const answers = selectAnswers(questions)(state)

    return {
      ...ownProps,
      assessment,
      answers,
      questions,
      grading: grading!,
    }
  } else {
    return ownProps
  }
}

export default connect(mapStateToProps)(withStudent(Workspace))
