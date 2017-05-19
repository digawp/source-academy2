import { values } from 'lodash'
import { connect, Dispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { createSelector } from 'reselect'
import { push } from 'react-router-redux'
import { State } from '../../types'
import Assessments, { OwnProps } from '../../components/journal/Assessments'
import { withViewAssessment } from '../../decorators'
import {
  selectPaths,
  selectAssessmentsByType,
} from '../../selectors'

const mapStateToProps =
  (state: State, ownProps: OwnProps) => {
    const paths = selectPaths(state)
    return {
      gradings: state.gradings,
      assessments: selectAssessmentsByType(
        paths[paths.length - 1].substring(0, paths.length - 1))(state),
    }
  }

export default withViewAssessment(connect(mapStateToProps)(Assessments))
