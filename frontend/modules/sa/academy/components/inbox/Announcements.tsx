import * as React from 'react'
import * as moment from 'moment'
import { values, partition } from 'lodash'
import { RouteComponentProps } from 'react-router'
import { IAnnouncement, IUser } from 'sa/core/types'

import AnnouncementCard from './AnnouncementCard'

export type Props = {
  announcements: {[id: number]: IAnnouncement}
  users: {[id: number]: IUser}
} & RouteComponentProps<any>

const Announcements: React.StatelessComponent<Props> =
  ({ announcements, users }) => {
    const [pinned, notPinned] = partition(
      values(announcements),
      a => a.pinned && moment().isBefore(moment(a.pinExpiry))
    )
    return (
      <div className="sa-announcements">
        {pinned.map(a => <AnnouncementCard
            pinned announcement={a} poster={users[a.poster]} />)}
        <hr />
        {notPinned.map(a => <AnnouncementCard
            announcement={a} poster={users[a.poster]} />)}
      </div>
    )
  }

export default Announcements
