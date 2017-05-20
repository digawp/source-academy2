import { WorkspaceState } from 'sa/core/types'

// Constants
export const RESET_WORKSPACE = 'currentWorkspace/RESET_WORKSPACE'
export const NEXT_QUESTION = 'currentWorkspace/NEXT_QUESTION'
export const PREVIOUS_QUESTION = 'currentWorkspace/PREVIOUS_QUESTION'

// Creators
export const resetWorkspace = (assessment: number) => ({
  type: RESET_WORKSPACE,
  payload: { assessment },
})
export const nextQuestion = () => ({ type: NEXT_QUESTION })
export const previousQuestion = () => ({ type: PREVIOUS_QUESTION })

type State = WorkspaceState | null

export const reducer = (state: State = null, action: any) => {
  switch (action.type) {
    case RESET_WORKSPACE:
      const { assessment } = action.payload
      return {
        activeQuestion: 0,
        assessment,
      }
    case NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: state!.activeQuestion + 1,
      }
    case PREVIOUS_QUESTION:
      return {
        ...state,
        activeQuestion: state!.activeQuestion - 1,
      }
    default:
      return state
  }
}
