import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { selectAssessment, selectGrading } from '../../selectors'
import { State } from '../../types'
import WorkspaceSecondaryNavbar, { OwnProps } from '../../components/workspace/WorkspaceSecondaryNavbar'
import { LayoutType } from 'sa/core/types'
import { setLayoutType } from '../../reducers/currentWorkspace'

const mapStateToNavbarProps = (state: State, ownProps: OwnProps) => {
  const baseProps = { workspace: state.currentWorkspace }
  const { location } = state.routing
  const paths = location!.pathname.split('/')
  const isJournal = paths[2] === 'journal'

  if (isJournal) {
    const id = parseInt(paths[paths.length - 1], 10)
    const assessment = selectAssessment(id)(state)
    const grading = selectGrading(id)(state)
    return { ...baseProps, assessment: assessment!, grading }
  } else {
    return baseProps
  }
}

const mapDispatchToNavbarProps = (dispatch: Dispatch<State>) => ({
  backToAssessments(type: string) {
    dispatch(push(`/academy/journal/assessments/${type}s`))
  },
  setLayoutType(layoutType: LayoutType) {
    dispatch(setLayoutType(layoutType))
  },
})

export default connect(mapStateToNavbarProps,
  mapDispatchToNavbarProps)(WorkspaceSecondaryNavbar)
