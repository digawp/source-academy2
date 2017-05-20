import { WorkspaceState } from 'sa/core/types'

// Constants
export const RESET_WORKSPACE = 'currentWorkspace/RESET_WORKSPACE'

// Creators
export const resetWorkspace = (assessment: number) => ({
  type: RESET_WORKSPACE,
  payload: { assessment },
})

type State = WorkspaceState | null

export const reducer = (state: State = null, action: any) => {
  switch (action.type) {
    case RESET_WORKSPACE:
      const { assessment } = action.payload
      return {
        activeQuestion: 0,
        assessment,
      }
    default:
      return state
  }
}
