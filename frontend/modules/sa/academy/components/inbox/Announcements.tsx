import * as React from 'react'
import * as moment from 'moment'
import { values, partition } from 'lodash'
import { RouteComponentProps } from 'react-router'
import { Announcement, User } from 'sa/core/types'

import AnnouncementCard from './AnnouncementCard'

export type Props = {
  announcements: {[id: number]: Announcement},
  users: {[id: number]: User},
} & RouteComponentProps<any>

const Announcements: React.StatelessComponent<Props> =
  ({ announcements, users }) => {
    const [pinned, notPinned] = partition(
      values(announcements),
      a => a.pinned && moment().isBefore(moment(a.pinExpiry)),
    )
    const pinnedAnnouncements =
      pinned.map(a => (
        <AnnouncementCard
          key={a.id}
          pinned={true}
          announcement={a}
          poster={users[a.poster]}
        />
      ))

    const otherAnnouncements =
      notPinned.map(a => (
        <AnnouncementCard
          key={a.id}
          announcement={a}
          poster={users[a.poster]}
        />
      ))

    return (
      <div className="sa-announcements">
        {pinnedAnnouncements}
        <hr />
        {otherAnnouncements}
      </div>
    )
  }

export default Announcements
