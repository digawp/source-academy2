import { values, sortBy } from 'lodash'
import { createSelector } from 'reselect'
import { State } from './types'
import { Question } from 'sa/core/types'

export const getAssessments = (state: State) => state.assessments
export const getQuestions = (state: State) => state.questions
export const getAnswers = (state: State) => state.answers
export const getCurrentStudent = (state: State) => state.currentStudent
export const getGradings = (state: State) => state.gradings
export const getLocation = (state: State) => state.routing.location

export const selectAssessment = (id: number) =>
  createSelector(
    getAssessments,
    (assessments) => values(assessments).find(a => a.id === id),
  )

export const selectPaths =
  createSelector(
    getLocation,
    (location) => location!.pathname.split('/'),
  )

export const selectAssessmentsByType = (type: string) =>
  createSelector(
    getAssessments,
    (assessments) => {
      return values(assessments).filter(a => a.type === type)
    })

export const selectGrading = (assessment: number) =>
  createSelector(
    getGradings,
    getCurrentStudent,
    (gradings, currentStudent) => values(gradings).find(g =>
      g.assessment === assessment && g.student === currentStudent.id),
  )

export const selectQuestions = (assessment: number) =>
  createSelector(
    getQuestions,
    (questions) => sortBy(
      values(questions).filter(q => q.assessment === assessment),
      q => q.order,
    ),
  )

export const selectAnswers = (questions: Question[]) =>
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
