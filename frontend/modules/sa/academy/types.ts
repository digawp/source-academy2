import { IAnnouncement, IStudent, IHappening, IAssessment,
  State as CoreState } from 'sa/core/types'

export type State = {
  currentStudent: IStudent
  assessment: {[id: number]: IAssessment}
  announcement: {[id: number]: IAnnouncement}
  happening: {[id: number]: IHappening}
} & CoreState
