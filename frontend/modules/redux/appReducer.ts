/**
 * Reducer for global application state
 * 
 * Manage global state that needs to be shared between ALL routes only!
 * E.g toggling demo mode, selecting application theme, etc. 
 */
import { Record } from 'immutable'
import { Action } from 'redux'

export const defaultParams = {
  isDemoMode: process.env.DEMO_MODE
}

export class AppState extends Record(defaultParams) {
  isDemoMode: boolean
}

const initialState = new AppState()

export default (state = initialState, action: Action) => {
  return state
}
