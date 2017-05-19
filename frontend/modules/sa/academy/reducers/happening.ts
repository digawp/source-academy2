import { Happening } from 'sa/core/types'

// Constants
export const FETCH_HAPPENINGS = 'announcement/FETCH_HAPPENINGS'
export const FETCH_HAPPENINGS_SUCCESS = 'announcement/FETCH_HAPPENINGS_SUCCESS'

// Creators
export const fetchHappenings = () => ({
  type: FETCH_HAPPENINGS,
})

export const fetchHappeningsSuccess = (happenings: Happening[]) => ({
  type: FETCH_HAPPENINGS_SUCCESS,
  payload: { happenings },
})

type State = { [id: number]: Happening }

export const reducer = (state: State = {}, action: any) => {
  switch (action.type) {
    case FETCH_HAPPENINGS_SUCCESS:
      const happenings: Happening[] = action.payload.happenings
      const newState: State = {}
      happenings.forEach((h) => { newState[h.id] = h })
      return {...state, ...newState}

    default:
      return state
  }
}
