import { IAnnouncement } from 'sa/core/types'

// Constants
export const FETCH_ANNOUNCEMENTS = 'announcement/FETCH_ANNOUNCEMENTS'
export const FETCH_ANNOUNCEMENTS_SUCCESS = 'announcement/FETCH_ANNOUNCEMENTS_SUCCESS'

// Creators
export const fetchAnnouncements = () => ({
  type: FETCH_ANNOUNCEMENTS
})

export const fetchAnnouncementsSuccess = (announcements: IAnnouncement[]) => ({
  type: FETCH_ANNOUNCEMENTS_SUCCESS,
  payload: { announcements }
})

export type State = { [id: number]: IAnnouncement }

export const reducer = (state: State = {}, action: any) => {
  switch (action.type) {
    case FETCH_ANNOUNCEMENTS_SUCCESS:
      const announcements: IAnnouncement[] = action.payload.announcements
      const newState: State = {}
      announcements.forEach((a) => { newState[a.id] = a })
      return {...state, ...newState}

    default:
      return state
  }
}
