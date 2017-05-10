import { Record } from 'immutable'

// Constants
const SET_INBOX_ACTIVE_TOPIC = 'SET_INBOX_ACTIVE_TOPIC'

// Creators
export const setInboxActiveTopic = (topic: string) => ({
  type: SET_INBOX_ACTIVE_TOPIC,
  payload: {
    topic
  }
})

// Reducers
export interface InboxParams {
  activeTopic?: string
}

const initialParams: InboxParams = {
  activeTopic: 'soon'
}

export class InboxState extends Record(initialParams) {
  activeTopic: string

  constructor(params: InboxParams) {
    params ? super(params) : super()
  }

  with(values: InboxParams) {
    return this.merge(values) as this
  }
}

export const reducer = (state = new InboxState(initialParams), action: any) => {
  switch(action.type) {
    case SET_INBOX_ACTIVE_TOPIC:
      const { topic } = action.payload
      return state.with({activeTopic: topic})
    default:
      return state
  }
}
