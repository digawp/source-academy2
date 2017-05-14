import { Record, Map, List } from 'immutable'
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

export type IAssessmentParams = {
  id?: number,
  type?: "mission" | "sidequest" | "path",
  order?: string,
  published?: boolean,
  title?: string 
  description?: string 
  coverPicture?: string 
  openedAt?: number,
  dueAt?: number
}

const defaultAssessment: IAssessmentParams = {
  id: 0,
  type: 'mission',
  order: '',
  published: false,
  title: '',
  description: '',
  coverPicture: '',
  openedAt: 0,
  dueAt: 0
}

export class Assessment extends Record(defaultAssessment) implements IAssessment {
  id: number
  type: "mission" | "sidequest" | "path"
  order: string
  published: boolean
  title: string 
  description: string 
  coverPicture: string 
  openedAt: number
  dueAt: number

  constructor(params: IAssessmentParams) {
    params ? super(params) : super()
  }
}

export const reducer = (state = Map<string, IAssessment>(), action: any) => {
  switch (action.type) {
    case FETCH_ASSESSMENTS_SUCCESS:
      const assessments: IAssessment[] = action.payload.assessments
      return state.merge(
        assessments.reduce((acc, x) =>
          acc.set(x.id.toString(), new Assessment(x)),
          Map<string, IAssessment>()
      ))

    default:
      return state
  }
}
