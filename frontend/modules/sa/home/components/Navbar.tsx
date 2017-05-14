import * as React from 'react'
import { IUser } from 'sa/core/types'
import { Button, Intent } from '@blueprintjs/core'

export interface INavbarProps {
  currentUser: IUser
  handleViewDemo: () => void
}

export default function Navbar({
  currentUser,
  handleViewDemo
}: INavbarProps) {
  return (
    <nav className="pt-navbar pt-dark pt-fixed-top">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">
          Source Academy
        </div>
      </div>
      <div className="pt-navbar-group pt-align-right">
        { process.env.DEMO_MODE &&
            <Button onClick={handleViewDemo} intent={Intent.SUCCESS}>
              View Demo
            </Button> }
      </div>
    </nav>
  )
}
