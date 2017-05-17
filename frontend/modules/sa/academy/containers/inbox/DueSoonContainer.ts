import * as moment from 'moment'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { IAssessment } from 'sa/core/types'
import { State } from '../../types'
import DueSoon from '../../components/inbox/DueSoon'

const selectDueSoon = (assessments: { [id: number]: IAssessment}, type: string) => {
  const values: IAssessment[] = []

  for (let key of Object.keys(assessments)) {
    values.push(assessments[parseInt(key, 10)])
  }

  return values.filter(
    (a: IAssessment) => {
      if (a.type !== type) {
        return false
      } else {
        const due = moment(a.dueAt)
        const now = moment()
        return due.subtract(7, 'days').startOf('day').isBefore(now)
      }
    })
}

const mapStateToProps = (state: State, ownProps: RouteComponentProps<any>) => ({
  sidequests: selectDueSoon(state.assessment, 'sidequest'),
  paths: selectDueSoon(state.assessment, 'path'),
  missions: selectDueSoon(state.assessment, 'mission')
})

export default connect(mapStateToProps)(DueSoon)