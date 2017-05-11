import { Record } from 'immutable'
import { push } from 'react-router-redux'

// Constants

// Creators
export const setInboxActiveTopic = (topic: string) => push(`?topic=${topic}`)

// Reducers
export interface InboxParams {
}

const initialParams: InboxParams = {
}

export class InboxState extends Record(initialParams) {

  constructor(params: InboxParams) {
    params ? super(params) : super()
  }

  with(values: InboxParams) {
    return this.merge(values) as this
  }
}

export const reducer = (state = new InboxState(initialParams), action: any) => {
  return state
}
