import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { State } from '../../types'
import Happenings from '../../components/inbox/Happening'

const mapStateToProps = (state: State, ownProps: RouteComponentProps<any>) => ({
  happening: state.happening,
  user: state.user,
  assessment: state.assessment
})

export default connect(mapStateToProps)(Happenings)