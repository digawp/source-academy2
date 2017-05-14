import { Record } from 'immutable'
import { IUser } from '../types'
import { User } from './user'

export const AUTHENTICATE = 'auth/AUTHENTICATE'
export const AUTHENTICATE_SUCCESS = 'auth/AUTHENTICATE_SUCCESS'

export const authenticate = (username: string, password: string) => {
  return {
    type: AUTHENTICATE,
    payload: {
      username,
      password
    }
  }
}

export const authenticateSuccess = (currentUser: IUser, token: string) => {
  return {
    type: AUTHENTICATE_SUCCESS,
    payload: {
      currentUser,
      token
    }
  }
}

export interface AuthParams {
  isAuthenticated?: boolean
  token?: string
  currentUser?: IUser
}

export const defaultParams: AuthParams = {
  isAuthenticated: false,
  currentUser: undefined,
  token: undefined
}

export class AuthState extends Record(defaultParams) {
  isAuthenticated: boolean
  currentUser: User
  token: string

  constructor(params?: AuthParams) {
    params ? super(params): super()
  }
}

const initialState = new AuthState()

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      const { currentUser, token } = action.payload
      return state.merge({
        currentUser: new User(currentUser),
        token,
        isAuthenticated: true
      })

    default:
      return state
  }
}
