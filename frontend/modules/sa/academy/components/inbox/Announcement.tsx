import * as React from 'react'
import * as moment from 'moment'
import { connect, MapStateToProps } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { State as UserState } from 'sa/core/reducers/user'
import { IAnnouncement } from 'sa/core/types'
import AnnouncementCard from '../announcement/AnnouncementCard'
import { State as AnnouncementState } from '../../reducers/announcement'

export type Props = {
  announcement: AnnouncementState
  user: UserState
} & RouteComponentProps<any>

const Announcement: React.StatelessComponent<Props> = ({ announcement, user }) => {
  const announcementList: IAnnouncement[] = Object.keys(announcement).map(
    k => announcement[parseInt(k, 10)])

  const pinned = announcementList.filter(a => a.pinned && (moment().isBefore(moment(a.pinExpiry))))
  const notPinned = announcementList.filter(a => !pinned.find((b) => b === a))

  return (
    <div className="sa-announcements">
      {pinned.map(a => <AnnouncementCard pinned announcement={a} poster={user[a.poster]} />)}
      <hr />
      {notPinned.map(a => <AnnouncementCard announcement={a} poster={user[a.poster]} />)}
    </div>
  )
}

const mapStateToProps: MapStateToProps<any, RouteComponentProps<any>> =
  (state) => ({
    user: state.user,
    announcement: state.announcement
  })

export default connect(mapStateToProps)(Announcement)

