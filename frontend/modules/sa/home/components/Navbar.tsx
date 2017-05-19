import * as React from 'react'
import { User } from 'sa/core/types'
import { Button, Intent } from '@blueprintjs/core'

export type Props = {
  currentUser: User,
  handleViewDemo: () => void,
}

const Navbar: React.StatelessComponent<Props> =
  ({ currentUser, handleViewDemo }) => {
    const viewDemoButton = process.env.DEMO_MODE && (
      <Button onClick={handleViewDemo} intent={Intent.SUCCESS}>
        View Demo
      </Button>
    )

    return (
      <nav className="pt-navbar pt-dark pt-fixed-top">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">
            Source Academy
          </div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          {viewDemoButton}
        </div>
      </nav>
    )
  }

export default Navbar
