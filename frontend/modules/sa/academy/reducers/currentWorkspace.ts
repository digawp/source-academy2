import { WorkspaceState, LayoutType } from 'sa/core/types'

// Constants
export const RESET_WORKSPACE = 'currentWorkspace/RESET_WORKSPACE'
export const NEXT_QUESTION = 'currentWorkspace/NEXT_QUESTION'
export const PREVIOUS_QUESTION = 'currentWorkspace/PREVIOUS_QUESTION'
export const SET_LAYOUT_TYPE = 'currentWorkspace/SET_LAYOUT_TYPE'

// Creators
export const resetWorkspace = (assessment: number) => ({
  type: RESET_WORKSPACE,
  payload: { assessment },
})
export const nextQuestion = () => ({ type: NEXT_QUESTION })
export const previousQuestion = () => ({ type: PREVIOUS_QUESTION })
export const setLayoutType = (layoutType: LayoutType) => ({
  type: SET_LAYOUT_TYPE,
  payload: { layoutType },
})

type State = WorkspaceState | null

export const reducer = (state: State = null, action: any) => {
  switch (action.type) {
    case RESET_WORKSPACE:
      const { assessment } = action.payload
      return {
        activeQuestion: 0,
        assessment,
        layoutType: LayoutType.SplitHorizontal,
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
    case SET_LAYOUT_TYPE:
      return {
        ...state,
        layoutType: action.payload.layoutType,
      }
    default:
      return state
  }
}
