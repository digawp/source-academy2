import * as React from 'react'
import * as moment from 'moment'
import { IAnnouncement, IUser } from 'sa/core/types'
import { Button, Text } from '@blueprintjs/core'

export type Props = {
  announcement: IAnnouncement
  poster: IUser
}

const AnnouncementCard: React.StatelessComponent<Props> = ({ announcement, poster }) => (
  <div className="announcement row">
    { poster &&
      <div className="poster col-xs-1">
        <img src={poster.profilePicture} />
      </div> }
    <div className="body col-xs">
      <h4>{announcement.title}</h4>
      <div className="content" dangerouslySetInnerHTML={{__html: announcement.content}} />
    </div>
  </div>
)

export default AnnouncementCard
