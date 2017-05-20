import { WorkspaceState, LayoutType, AnswerTabType } from 'sa/core/types'

// Constants
export const RESET_WORKSPACE = 'currentWorkspace/RESET_WORKSPACE'
export const NEXT_QUESTION = 'currentWorkspace/NEXT_QUESTION'
export const PREVIOUS_QUESTION = 'currentWorkspace/PREVIOUS_QUESTION'
export const SET_LAYOUT_TYPE = 'currentWorkspace/SET_LAYOUT_TYPE'
export const SET_ACTIVE_ANSWER_TAB = 'currentWorkspace/SET_ACTIVE_ANSWER_TAB'

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
export const setActiveAnswerTab = (answerTab: string) => ({
  type: SET_ACTIVE_ANSWER_TAB,
  payload: { answerTab },
})

const initialState: WorkspaceState = {
  activeQuestion: 0,
  assessment: 0,
  layoutType: LayoutType.SplitHorizontal,
  activeAnswerTab: AnswerTabType.Code,
}

type State = WorkspaceState | null

export const reducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case RESET_WORKSPACE:
      const { assessment } = action.payload
      return {
        ...initialState,
        assessment,
      }
    case NEXT_QUESTION:
      return {
        ...state,
        activeAnswerTab: initialState.activeAnswerTab,
        activeQuestion: state!.activeQuestion + 1,
      }
    case PREVIOUS_QUESTION:
      return {
        ...state,
        activeAnswerTab: initialState.activeAnswerTab,
        activeQuestion: state!.activeQuestion - 1,
      }
    case SET_LAYOUT_TYPE:
      return {
        ...state,
        layoutType: action.payload.layoutType,
      }
    case SET_ACTIVE_ANSWER_TAB:
      return {
        ...state,
        activeAnswerTab: action.payload.answerTab,
      }
    default:
      return state
  }
}
