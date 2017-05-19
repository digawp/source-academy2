import { RouteComponentProps } from 'react-router'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { State } from '../../types'
import Happenings from '../../components/inbox/Happenings'

const mapStateToProps = (state: State, ownProps: RouteComponentProps<any>) => ({
  happenings: state.happenings,
  users: state.users,
  assessments: state.assessments,
})

const mapDispatchToProps =
  (dispatch: Dispatch<State>) => ({
    viewAssessment(assessment: number, student?: number) {
      let url = `/academy/journal/workspaces/${assessment}`
      if (student) {
        url += `?student=${student}`
      }
      dispatch(push(url))
    },
  })

export default connect(mapStateToProps, mapDispatchToProps)(Happenings)
