import { values } from 'lodash'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { createSelector } from 'reselect'
import { State } from '../../types'
import Assessments from '../../components/journal/Assessments'

const getAssessments = (state: State) => state.assessments

const selectAssessments = createSelector(
  getAssessments,
  (assessments) => {
    const paths = location.pathname.split('/')
    let assessmentType: string = paths[paths.length - 1] || 'missions'
    assessmentType = assessmentType.substring(0, assessmentType.length - 1)
    return values(assessments).filter(a =>
      a.type === assessmentType
    )
  })

const mapStateToProps =
  (state: State, ownProps: RouteComponentProps<any>) => ({
    assessments: selectAssessments(state)
  })

export default connect(mapStateToProps)(Assessments)
