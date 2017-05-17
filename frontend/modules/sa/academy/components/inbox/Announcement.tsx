import * as React from 'react'
import * as moment from 'moment'
import { values, partition } from 'lodash'
import { RouteComponentProps } from 'react-router'
import { IAnnouncement, IUser } from 'sa/core/types'

import AnnouncementCard from './AnnouncementCard'

export type Props = {
  announcement: {[id: number]: IAnnouncement}
  user: {[id: number]: IUser}
} & RouteComponentProps<any>

const Announcement: React.StatelessComponent<Props> =
  ({ announcement, user }) => {
    const [pinned, notPinned] = partition(
      values(announcement),
      a => a.pinned && moment().isBefore(moment(a.pinExpiry))
    )
    return (
      <div className="sa-announcements">
        {pinned.map(a => <AnnouncementCard
            pinned announcement={a} poster={user[a.poster]} />)}
        <hr />
        {notPinned.map(a => <AnnouncementCard
            announcement={a} poster={user[a.poster]} />)}
      </div>
    )
  }

export default Announcement
