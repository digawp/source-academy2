import * as React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { State as AnnouncementState } from '../../reducers/announcement'
import { State as UserState } from 'sa/core/reducers/user'
import { IAnnouncement } from 'sa/core/types'
import AnnouncementCard from './AnnouncementCard'

export type Props = {
  announcement: AnnouncementState
  user: UserState
}

const Announcement: React.StatelessComponent<Props> = ({ announcement, user }) => {
  const announcementList: IAnnouncement[] = Object.keys(announcement).map(
    k => announcement[parseInt(k, 10)])

  const pinned = announcementList.filter(a => a.pinned && (moment().isBefore(moment(a.pinExpiry))))
  const notPinned = announcementList.filter(a => !pinned.find((b) => b === a))

  return (
    <div className="sa-announcements">
      {pinned.map(a => <AnnouncementCard announcement={a} poster={user[a.poster]} />)}
      {notPinned.map(a => <AnnouncementCard announcement={a} poster={user[a.poster]} />)}
    </div>
  )
}


export default connect(state => ({
  user: state.user,
  announcement: state.announcement
}))(Announcement)

