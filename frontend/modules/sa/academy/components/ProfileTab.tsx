import * as React from 'react'
import { Button, Text } from '@blueprintjs/core'
import { IUser } from 'sa/core/types'

export interface IProfileTabProps {
  user: IUser
}

export default function ProfileTab({ user }: IProfileTabProps) {
  const noPadding = { padding: 0 }
  return (
    <div className="profile-tab row">
      <div className="photo" style={noPadding}>
        <img src={user.profilePicture} />
      </div>
      <div className="name col-xs" style={noPadding}>
        <Text className="name" ellipsize>
          {user.firstName && (user.firstName + ' ' + user.lastName) }
        </Text>
        <div className="stat-bar">
          <span className="stat-bar-fill" />
          Level <b>36</b>
        </div>
      </div>
    </div>
  )
}
