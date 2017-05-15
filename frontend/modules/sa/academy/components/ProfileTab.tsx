import * as React from 'react'
import { Button, Text } from '@blueprintjs/core'
import { IUser, IStudent } from 'sa/core/types'

export interface IProfileTabProps {
  user: IUser
  student: IStudent
}

export default function ProfileTab({ user, student }: IProfileTabProps) {
  const noPadding = { padding: 0 }
  return (
    <div className="profile-tab row">
      <div className="photo" style={noPadding}>
        <img src={user.profilePicture} />
      </div>
      <div className="name col-xs" style={noPadding}>
        { student && 
          <div className="stat-bar">
            <span className="stat-bar-fill" />
            Level <b>{student.level}</b>
          </div> }
      </div>
    </div>
  )
}
