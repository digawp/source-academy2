import { Store, Reducer } from 'redux'

// Domain Models
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
}

export interface IAppDelegate {
  store: AsyncStore

  injectReducers: (
    store: AsyncStore,
    reducers: {[name: string]: Reducer<any>}) => void

  makeRootReducer: (
    asyncReducers: {[name: string]: Reducer<any>}
  ) => Reducer<any>

  bundleLoaded: (component: React.ComponentClass<any>) => void
}
