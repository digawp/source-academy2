import { values } from 'lodash'
import { connect, Dispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { createSelector } from 'reselect'
import { push } from 'react-router-redux'
import { State } from '../../types'
import Assessments, { OwnProps } from '../../components/journal/Assessments'
import { withViewAssessment } from '../../decorators'

const getAssessments = (state: State) => state.assessments

const selectAssessments = createSelector(
  getAssessments,
  (assessments) => {
    const paths = location.pathname.split('/')
    let assessmentType: string = paths[paths.length - 1] || 'missions'
    assessmentType = assessmentType.substring(0, assessmentType.length - 1)
    return values(assessments).filter(a =>
      a.type === assessmentType,
    )
  })

const mapStateToProps =
  (state: State, ownProps: OwnProps) => ({
    gradings: state.gradings,
    assessments: selectAssessments(state),
  })

export default withViewAssessment(connect(mapStateToProps)(Assessments))
