import { IAssessment } from 'sa/core/types'

// Constants
export const GET_ASSESSMENT = 'assessment/GET_ASSESSMENT'
export const GET_ASSESSMENT_SUCCESS = 'assessment/GET_ASSESSMENT_SUCCESS'
export const FETCH_ASSESSMENTS = 'assessment/FETCH_ASSESSMENTS'
export const FETCH_ASSESSMENTS_SUCCESS = 'assessment/FETCH_ASSESSMENTS_SUCCESS'

// Creators
export const fetchAssessments = () => ({
  type: FETCH_ASSESSMENTS
})

export const fetchAssessmentsSuccess = (assessments: IAssessment[]) => ({
  type: FETCH_ASSESSMENTS_SUCCESS,
  payload: { assessments }
})

export const getAssessment = (id: number) => ({
  type: GET_ASSESSMENT,
  payload: { id }
})

export const getAssessmentSuccess = (assessment: IAssessment) => ({
  type: GET_ASSESSMENT_SUCCESS,
  payload: { assessment }
})


export type State = { [id: number]: IAssessment }

export const reducer = (state: State = {}, action: any) => {
  switch (action.type) {
    case GET_ASSESSMENT_SUCCESS:
      const { assessment } = action.payload
      return {...state, [assessment.id]: assessment}

    case FETCH_ASSESSMENTS_SUCCESS:
      const assessments: IAssessment[] = action.payload.assessments
      const newState: State = {}
      assessments.forEach(a => newState[a.id] = a)
      return {...state, ...newState}

    default:
      return state
  }
}
