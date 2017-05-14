import { Record } from 'immutable'
import { IUser } from '../types'

export interface UserParams {
  id?: number
  role?: "admin" | "staff" | "student"
  firstName?: string
  lastName?: string
  profilePicture?: string
}

const defaultUser: UserParams = {
  id: 0,
  role: "student",
  firstName: "Unknown",
  lastName: "User",
  profilePicture: "#"
}

export class User extends Record(defaultUser) implements IUser {
  id: number
  role: "admin" | "staff" | "student"
  firstName: string
  lastName: string
  profilePicture: string

  constructor(params?: UserParams) {
    params ? super(params): super()
  }
}