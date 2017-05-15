import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Button, Intent } from '@blueprintjs/core'
import { createLink } from 'sa/core/util'
import { IUser, IStudent } from 'sa/core/types'

export interface Props extends RouteComponentProps<any> {
  currentUser: IUser
  currentStudent: IStudent
}

const Navbar: React.StatelessComponent<Props> = ({ match, currentUser, currentStudent }) => {
  // Control Active Tabs
  const isInboxTabActive = match.url.endsWith('inbox')
  const isJournalTabActive = match.url.endsWith('journal')
  const isMaterialsTabActive = match.url.endsWith('materials')
  const isSettingsTabActive = match.url.endsWith('settings')

  const getClassNames = (icon: string) => `pt-button pt-minimal pt-icon-${icon}`

  return (
    <div className="sa-academy-navbar pt-navbar pt-navbar-dark row">
      <div className="resume-game col-xs-2">
      </div>
      <div className="navigation-buttons pt-navbar-group pt-button-group pt-large pt-fill col-xs-10">
        {createLink(`/academy/inbox`, getClassNames('inbox'),
                     isInboxTabActive, <span>Inbox</span>)}
        {createLink(`/academy/journal`, getClassNames('book'),
                     isJournalTabActive, <span>Journal</span>)}
        {createLink(`/academy/materials`, getClassNames('folder-open'),
                     isMaterialsTabActive, <span>Materials</span>)}
        {createLink(`/academy/settings`, getClassNames('cog'),
                     isSettingsTabActive, <span>Settings</span>)}
      </div>
    </div>
  )
}

export default Navbar
