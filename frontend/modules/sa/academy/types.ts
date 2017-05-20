import {
  Announcement,
  Answer,
  Assessment,
  Grading,
  Happening,
  Question,
  State as CoreState,
  Student,
  WorkspaceState,
} from 'sa/core/types'

export type State = {
  currentStudent: Student,
  currentWorkspace: WorkspaceState,
  assessments: {[id: number]: Assessment},
  announcements: {[id: number]: Announcement},
  happenings: {[id: number]: Happening},
  gradings: {[id: number]: Grading},
  answers: {[id: number]: Answer},
  questions: {[id: number]: Question},
} & CoreState
