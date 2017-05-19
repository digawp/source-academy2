import { Announcement, Student, Happening, Assessment, Grading,
  State as CoreState } from 'sa/core/types'

export type State = {
  currentStudent: Student
  assessments: {[id: number]: Assessment}
  announcements: {[id: number]: Announcement}
  happenings: {[id: number]: Happening},
  gradings: {[id: number]: Grading},
} & CoreState
