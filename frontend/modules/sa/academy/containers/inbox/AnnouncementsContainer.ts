import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import Announcements from '../../components/inbox/Announcement'
import { State } from '../../types'

const mapStateToProps =
  (state: State, ownProps: RouteComponentProps<any>) => ({
    user: state.user,
    announcement: state.announcement
  })

export default connect(mapStateToProps)(Announcements)