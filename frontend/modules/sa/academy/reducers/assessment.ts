import { IAssessment } from 'sa/core/types'

// Constants
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

export type State = { [id: number]: IAssessment }

export const reducer = (state: State = {}, action: any) => {
  switch (action.type) {
    case FETCH_ASSESSMENTS_SUCCESS:
      const assessments: IAssessment[] = action.payload.assessments
      const newState: State = {}
      assessments.forEach(a => newState[a.id] = a)
      return {...state, ...newState}

    default:
      return state
  }
}
