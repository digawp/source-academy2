import * as React from 'react'
import * as moment from 'moment'
import { Announcement, User } from 'sa/core/types'
import { Button, Text } from '@blueprintjs/core'

export type Props = {
  announcement: Announcement,
  poster: User,
  pinned?: boolean,
}

type FooterProps = {
  user: User,
}

type BodyProps = {
  title: string,
  content: string,
}

const Footer: React.StatelessComponent<FooterProps> = ({ user }) => (
  <div className="footer row">
    <div className="poster">
      <img src={user.profilePicture} />
    </div>
    <div className="author col-xs">
      {user.firstName} {user.lastName}
    </div>
  </div>
)

const Body: React.StatelessComponent<BodyProps> = ({ title, content }) => (
  <div className="body">
    <h5 className="heading">{title}</h5>
    <hr />
    <div className="content" dangerouslySetInnerHTML={{__html: content}} />
  </div>
)

const PinnedAnnouncement = (
  <Button disabled={true} className="pt-minimal pin" iconName="pin">
    Pinned
  </Button>
)

const AnnouncementCard: React.StatelessComponent<Props> =
  ({ announcement, pinned, poster }) => (
    <div className="announcement">
      <Body title={announcement.title} content={announcement.content} />
      {poster && <Footer user={poster} />}
      {pinned && PinnedAnnouncement}
    </div>
  )

export default AnnouncementCard
