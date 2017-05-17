import { IUser } from '../types'

export const GET_USER = 'user/GET_USER'
export const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS'

export const getUser = (id: number) => ({
  type: GET_USER,
  payload: { id }
})

export const getUserSuccess = (user: IUser) => ({
  type: GET_USER_SUCCESS,
  payload: { user }
})

type State = { [id: number]: IUser }

export const reducer = (state: State = {}, action: any) => {
  switch(action.type) {
    case GET_USER_SUCCESS:
      const { user } = action.payload
      return {...state, [user.id]: user } 
    default:
      return state
  }
}