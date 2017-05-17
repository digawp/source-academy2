import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import Announcements from '../../components/inbox/Announcements'
import { State } from '../../types'

const mapStateToProps =
  (state: State, ownProps: RouteComponentProps<any>) => ({
    users: state.users,
    announcements: state.announcements
  })

export default connect(mapStateToProps)(Announcements)