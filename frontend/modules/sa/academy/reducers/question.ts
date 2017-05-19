import { Question } from 'sa/core/types'

// Constants
export const GET_QUESTION = 'question/GET_QUESTION'
export const FETCH_QUESTIONS_BY_ASSESSMENT = 'answer/FETCH_QUESTIONS_BY_ASSESSMENT'
export const GET_QUESTION_SUCCESS = 'question/GET_QUESTION_SUCCESS'
export const FETCH_QUESTIONS_SUCCESS = 'question/FETCH_QUESTIONS_SUCCESS'

// Creators
export const getQuestion = (id: number) => ({
  type: GET_QUESTION,
  payload: { id },
})

export const fetchQuestionsByAssessment = (assessment: number) => ({
  type: FETCH_QUESTIONS_BY_ASSESSMENT,
  payload: { assessment },
})

export const getQuestionSuccess = (question: Question) => ({
  type: GET_QUESTION_SUCCESS,
  payload: { question },
})

export const fetchQuestionsSuccess = (questions: Question[]) => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: { questions },
})

type State = { [id: number]: Question }

export const reducer = (state: State = {}, action: any) => {
  switch (action.type) {
    case GET_QUESTION_SUCCESS:
      const { question } = action.payload
      return {...state, [question.id]: question}

    case FETCH_QUESTIONS_SUCCESS:
      const questions: Question[] = action.payload.questions
      const newState: State = {}
      questions.forEach(q => newState[q.id] = q)
      return {...state, ...newState}

    default:
      return state
  }
}
