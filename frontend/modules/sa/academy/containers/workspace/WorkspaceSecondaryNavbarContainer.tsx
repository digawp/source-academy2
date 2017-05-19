import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { selectAssessment } from '../../selectors'
import { State } from '../../types'
import WorkspaceSecondaryNavbar, { OwnProps } from '../../components/workspace/WorkspaceSecondaryNavbar'

const mapStateToNavbarProps = (state: State, ownProps: OwnProps) => {
  const { location } = state.routing
  const paths = location!.pathname.split('/')
  const isJournal = paths[2] === 'journal'

  if (isJournal) {
    const id = parseInt(paths[paths.length - 1], 10)
    const assessment = selectAssessment(id)(state)
    return { assessment: assessment! }
  } else {
    return {}
  }
}

const mapDispatchToNavbarProps = (dispatch: Dispatch<State>) => ({
  backToAssessments(type: string) {
    dispatch(push(`/academy/journal/assessments/${type}s`))
  },
})

export default connect(mapStateToNavbarProps,
  mapDispatchToNavbarProps)(WorkspaceSecondaryNavbar)
