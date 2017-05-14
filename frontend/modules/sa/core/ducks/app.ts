import { Record } from 'immutable'
import { Action } from 'redux'

export interface AppParams {
  isDemoMode?: boolean
}

export const defaultParams: AppParams = {
  isDemoMode: process.env.DEMO_MODE
}

export class AppState extends Record(defaultParams) {
  isDemoMode: boolean

  constructor(params?: AppParams) {
    params ? super(params): super()
  }
}

const initialState = new AppState()

export const reducer = (state = initialState, action: Action) => {
  return state
}
