import * as moment from 'moment'
import { values } from 'lodash'
import { createSelector } from 'reselect'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { IAssessment } from 'sa/core/types'
import { State } from '../../types'
import DueSoon from '../../components/inbox/DueSoon'

const getAssessments = (state: State) => state.assessments

const selectByType = (type: string) =>
  createSelector(
    getAssessments,
    (assessments) =>
      values(assessments).filter((a) => {
        if (a.type !== type) {
          return false
        } else {
          const due = moment(a.dueAt)
          const now = moment()
          return due.subtract(7, 'days').startOf('day').isBefore(now)
        }
      })
  )

const mapStateToProps = (state: State, ownProps: RouteComponentProps<any>) => ({
  sidequests: selectByType('sidequest')(state),
  paths: selectByType('path')(state),
  missions: selectByType('mission')(state)
})

export default connect(mapStateToProps)(DueSoon)