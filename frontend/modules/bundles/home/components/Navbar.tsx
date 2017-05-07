import * as React from 'react'
import { Button, Intent } from '@blueprintjs/core'

export default function Navbar({
  handleViewDemo = () => {}
}) {
  return (
    <nav className="pt-navbar pt-dark pt-fixed-top">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">
          Source Academy
        </div>
      </div>
      <div className="pt-navbar-group pt-align-right">
        <Button onClick={handleViewDemo} intent={Intent.SUCCESS}>
          View Demo
        </Button>
      </div>
    </nav>
  )
}
