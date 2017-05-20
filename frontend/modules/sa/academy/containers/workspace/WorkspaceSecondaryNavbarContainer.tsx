import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { selectAssessment } from '../../selectors'
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
    return { ...baseProps, assessment: assessment! }
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
