import { History } from 'history'
import { Store, Reducer } from 'redux'

// Domain reducers
export type User = {
  id: number,
  role: 'admin' | 'staff' | 'student',
  firstName: string,
  lastName: string,
  profilePicture: string,
}

export type Announcement = {
  id: number,
  poster: number,
  published: boolean,
  pinned: boolean,
  updatedAt: number,
  pinExpiry: number,
  title: string,
  content: string,
}

export type Assessment = {
  id: number,
  type: 'mission' | 'sidequest' | 'path',
  order: string,
  published: boolean,
  title: string,
  description: string,
  coverPicture: string,
  openedAt: number,
  dueAt: number,
}

export type Student = {
  id: number,
  user: number,
  level: number,
  experiencePoint: number,
}

export type Answer = {
  id: number,
  question: number,
  student: number,
  code?: string,
  mcqChoice?: number,
}

export type Grading = {
  id: number,
  status: 'locked' | 'unlocked' | 'attempting' | 'submitted' | 'graded',
  assessment: number,
  autoGraded?: boolean,
  student: number,
  gradedBy?: number,
  gradedAt?: number,
  marksObtained?: number,
  experiencePoint?: number,
}

export const FIRST_TO_FINISH = 'first_to_finish'
export const SECOND_TO_FINISH = 'second_to_finish'
export const THIRD_TO_FINISH = 'third_to_finish'
export const ACHIEVEMENT_GOT = 'achievement_got'
export const LEVEL_UP = 'level_up'

export type Happening = {
  id: number,
  timestamp: number,
  type:
     typeof FIRST_TO_FINISH
   | typeof SECOND_TO_FINISH
   | typeof THIRD_TO_FINISH
   | typeof ACHIEVEMENT_GOT
   | typeof LEVEL_UP
  user: number,
  assessment?: number,
  achievement?: number,
  level?: number,
}

// UI Types
export type AuthState = {
  isAuthenticated: boolean,
  currentUser: User | null,
  token: string | null,
}

// Globals
export type AsyncStore = {
  asyncReducers: {[index: string]: Reducer<any>},
  asyncSagas: string[],
} & Store<any>

export interface IAppDelegate {
  store: AsyncStore
  history: History

  injectReducers(reducers: {[name: string]: Reducer<any>}): void
  injectSaga(key: string, saga: any): void,
  createRootReducer(asyncReducers: {[name: string]: Reducer<any>}): Reducer<any>,
}

export type BundleLoader = (
  app: IAppDelegate,
  bundleLoaded: (component: React.ComponentClass<any>) => void) => void

export interface IResource<T> {
  get(id: number): Promise<T>,
  fetch(limit?: number): Promise<T[]>,
}

export interface IAuthApi {
  refresh(): Promise<User & { token: string }>,
  authenticate(username: string, password: string): Promise<User & { token: string }>,
  deauthenticate(): void,
}

export interface IStudentAPI {
  getByUser(id: number): Promise<Student>,
}

export interface IGradingAPI {
  getByAssessment(assessment: number, student: number): Promise<Grading>,
  attemptAssessment(assessment: number, student: number): Promise<boolean>,
  unlockAssessment(assessment: number, student: number): Promise<boolean>,
}

export type State = {
  auth: {[id: number]: AuthState},
  users: {[id: number]: User},
}

export type API = {
  auth: IAuthApi,
  assessments: IResource<Assessment>,
  announcements: IResource<Announcement>,
  users: IResource<User>,
  students: IResource<Student> & IStudentAPI,
  happenings: IResource<Happening>,
  gradings: IResource<Grading> & IGradingAPI,
}
