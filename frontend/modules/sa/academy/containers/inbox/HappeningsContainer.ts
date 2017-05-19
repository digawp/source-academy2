import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { State } from '../../types'
import Happenings from '../../components/inbox/Happenings'

const mapStateToProps = (state: State, ownProps: RouteComponentProps<any>) => ({
  happenings: state.happenings,
  users: state.users,
  assessments: state.assessments,
})

export default connect(mapStateToProps)(Happenings)
