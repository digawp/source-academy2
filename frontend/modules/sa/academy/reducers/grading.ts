import { Grading } from 'sa/core/types'

export const GET_GRADING = 'grading/GET_GRADING'
export const GET_GRADING_SUCCESS = 'grading/GET_GRADING_SUCCESS'

export const getGrading = (assessment: number) => ({
  type: GET_GRADING,
  payload: { assessment },
})

export const getGradingSuccess = (grading: Grading) => ({
  type: GET_GRADING_SUCCESS,
  payload: { grading },
})

type State = {[id: number]: Grading}

export const reducer = (state: State = {}, action: any) => {
  switch (action.type) {
    case GET_GRADING_SUCCESS:
      const { grading } = action.payload
      return {...state, [grading.id]: grading }
    default:
      return state
  }
}
