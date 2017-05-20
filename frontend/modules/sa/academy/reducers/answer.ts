import { Answer } from 'sa/core/types'

// Constants
export const GET_ANSWER = 'answer/GET_ANSWER'
export const FETCH_ANSWERS_BY_ASSESSMENT = 'answer/FETCH_ANSWERS_BY_ASSESSMENT'
export const FETCH_ANSWERS_SUCCESS = 'answer/FETCH_ANSWERS_SUCCESS'
export const GET_ANSWER_SUCCESS = 'answer/GET_ANSWER_SUCCESS'
export const SET_ANSWER_VALUE = 'answer/SET_ANSWER_VALUE'

// Creators
export const getAnswer = (id: number) => ({
  type: GET_ANSWER,
  payload: { id },
})

export const fetchAnswersByAssessment = (assessment: number, student: number) => ({
  type: FETCH_ANSWERS_BY_ASSESSMENT,
  payload: { assessment, student},
})

export const fetchAnswersSuccess = (answers: Answer[]) => ({
  type: FETCH_ANSWERS_SUCCESS,
  payload: { answers },
})

export const getAnswerSuccess = (answer: Answer) => ({
  type: GET_ANSWER_SUCCESS,
  payload: { answer },
})

export const setAnswerValue = (answer: number, value: string) => ({
  type: SET_ANSWER_VALUE,
  payload: { answer, value },
})

type State = { [id: number]: Answer }

export const reducer = (state: State = {}, action: any) => {
  switch (action.type) {
    case GET_ANSWER_SUCCESS:
      const { answer } = action.payload
      return {...state, [answer.id]: answer}

    case FETCH_ANSWERS_SUCCESS:
      const answers: Answer[] = action.payload.answers
      const newState: State = {}
      answers.forEach(a => newState[a.id] = a)
      return {...state, ...newState}

    case SET_ANSWER_VALUE:
      const { answer: id, value }  = action.payload
      return {
        ...state,
        [id]: {
          ...state[id],
          value,
        },
      }

    default:
      return state
  }
}
