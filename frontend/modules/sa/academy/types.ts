import { IAnnouncement, IStudent, IHappening, IAssessment, IGrading,
  State as CoreState } from 'sa/core/types'

export type State = {
  currentStudent: IStudent
  assessments: {[id: number]: IAssessment}
  announcements: {[id: number]: IAnnouncement}
  happenings: {[id: number]: IHappening},
  gradings: {[id: number]: IGrading}
} & CoreState
