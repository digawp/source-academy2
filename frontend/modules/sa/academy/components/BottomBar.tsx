import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { IUser, IStudent } from 'sa/core/types'

import ProfileTab from './ProfileTab'

export interface IBottomBarProps extends RouteComponentProps<any> {
  currentUser: IUser
  currentStudent: IStudent
}

export default function BottomBar({ currentUser, currentStudent }: IBottomBarProps) {
  return (
    <div className="sa-academy-bottombar">
      <div className="navigation-buttons col-xs-3">
        <ProfileTab user={currentUser} student={currentStudent} />
      </div>
    </div>
  )
}