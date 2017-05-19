import { reducer as assessments } from './assessment'
import { reducer as currentStudent } from './currentStudent'
import { reducer as announcements } from './announcement'
import { reducer as happenings } from './happening'
import { reducer as gradings } from './grading'
import { reducer as answers } from './answer'
import { reducer as questions } from './question'

export default {
  announcements,
  answers,
  assessments,
  currentStudent,
  gradings,
  happenings,
  questions,
}
