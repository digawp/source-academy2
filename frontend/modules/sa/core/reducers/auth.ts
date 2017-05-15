import { IUser } from '../types'

export const AUTHENTICATE = 'auth/AUTHENTICATE'
export const AUTHENTICATE_SUCCESS = 'auth/AUTHENTICATE_SUCCESS'

export const authenticate = (username: string, password: string) => ({
  type: AUTHENTICATE,
  payload: { username, password }
})

export const authenticateSuccess = (currentUser: IUser, token: string) => ({
  type: AUTHENTICATE_SUCCESS,
  payload: { currentUser, token }
})

export type State = {
  isAuthenticated: boolean
  currentUser: IUser | null
  token: string | null
}

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  token: null
} 

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      const { currentUser, token } = action.payload
      return {
        ...state,
        currentUser,
        token,
        isAuthenticated: true
      }

    default:
      return state
  }
}
