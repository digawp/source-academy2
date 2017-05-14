import { Record } from 'immutable'
import { IStudent } from 'sa/core/types'

// Constants
export const SET_CURRENT_STUDENT = 'currentStudent/SET_CURRENT_STUDENT'
export const GET_CURRENT_STUDENT = 'currentStudent/GET_CURRENT_STUDENT'

// Creators
export const setCurrentStudent = (student: IStudent) => ({
  type: SET_CURRENT_STUDENT,
  payload: {
    currentStudent: student
  }
})

export const getCurrentStudent = () => ({
  type: GET_CURRENT_STUDENT
})


export const reducer = (state = null, action: any) => {
  switch (action.type) {
    case SET_CURRENT_STUDENT:
      return action.payload.currentStudent
    default:
      return state
  }
}
