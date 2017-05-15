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

// UI Types

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

export interface API {
  auth: IAuthApi
  assessment: IResource<IAssessment>
  announcement: IResource<IAnnouncement>
  user: IResource<IUser>
  student: IResource<IStudent> & IStudentAPI
}
