import { History } from 'history'
import { Store, Reducer } from 'redux'

// Domain reducers
export interface IUser {
  id: number
  role: "admin" | "staff" | "student"
  firstName: string
  lastName: string
  profilePicture: string
}

export interface IAnnouncement {
  id: number
  poster: number
  published: boolean
  pinned: boolean
  updatedAt: number
  pinExpiry: number
  title: string
  content: string
}

export interface IAssessment {
  id: number
  type: "mission" | "sidequest" | "path"
  order: string
  published: boolean
  title: string
  description: string
  coverPicture: string
  openedAt: number
  dueAt: number
}

export interface IStudent {
  id: number
  user: number
  level: number
  experiencePoint: number
}

export interface IAnswer {
  id: number
  question: number
  student: number
  code?: string
  mcqChoice?: number
}

export interface IGrading {
  id: number
  status: "not_opened" | "attempting" | "submitted" | "manual"
  assessment?: number
  student: number
  gradedBy: number
  gradedAt: number
  marksObtained?: number
  experiencePoint?: number
}

export const FIRST_TO_FINISH = "first_to_finish"
export const SECOND_TO_FINISH = "second_to_finish"
export const THIRD_TO_FINISH = "third_to_finish"
export const ACHIEVEMENT_GOT = "achievement_got"
export const LEVEL_UP = "level_up"

export interface IHappening {
  id: number
  timestamp: number
  type:
     typeof FIRST_TO_FINISH
   | typeof SECOND_TO_FINISH 
   | typeof THIRD_TO_FINISH 
   | typeof ACHIEVEMENT_GOT 
   | typeof LEVEL_UP 
  user: number
  assessment?: number
  achievement?: number
  level?: number
}

// UI Types
export type AuthState = {
  isAuthenticated: boolean
  currentUser: IUser | null
  token: string | null
}

// Globals
export interface AsyncStore extends Store<any> {
  asyncReducers: {[index: string]: Reducer<any>}
  asyncSagas: string[]
}

export interface IAppDelegate {
  store: AsyncStore
  history: History

  injectReducers(reducers: {[name: string]: Reducer<any>}): void
  injectSaga(key: string, saga: any): void,
  createRootReducer(asyncReducers: {[name: string]: Reducer<any>}): Reducer<any>
}

export type BundleLoader = (
  app: IAppDelegate,
  bundleLoaded: (component: React.ComponentClass<any>) => void) => void

export interface IResource<T> {
  get(id: number): Promise<T>
  fetch(limit?: number): Promise<T[]>
}

export interface IAuthApi {
  refresh(): Promise<IUser & { token: string }>
  authenticate(username: string, password: string): Promise<IUser & { token: string }>
  deauthenticate(): void
}

export interface IStudentAPI {
  getByUser(id: number): Promise<IStudent>
}

export type State = {
  auth: {[id: number]: AuthState}
  user: {[id: number]: IUser}
}

export interface API {
  auth: IAuthApi
  assessment: IResource<IAssessment>
  announcement: IResource<IAnnouncement>
  user: IResource<IUser>
  student: IResource<IStudent> & IStudentAPI
  happening: IResource<IHappening>
}
