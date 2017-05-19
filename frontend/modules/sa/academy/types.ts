import {
  Announcement,
  Answer,
  Assessment,
  Grading,
  Happening,
  Question,
  State as CoreState,
  Student,
} from 'sa/core/types'

export type State = {
  currentStudent: Student
  assessments: {[id: number]: Assessment}
  announcements: {[id: number]: Announcement}
  happenings: {[id: number]: Happening},
  gradings: {[id: number]: Grading},
  answers: {[id: number]: Answer},
  questions: {[id: number]: Question},
} & CoreState
