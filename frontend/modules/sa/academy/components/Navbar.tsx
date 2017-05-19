import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Button, Intent } from '@blueprintjs/core'
import { createLink } from 'sa/core/util'
import { User, Student } from 'sa/core/types'

export type Props = {
  currentUser: User,
  currentStudent: Student,
} & RouteComponentProps<any>

const Navbar: React.StatelessComponent<Props> =
  ({ match, currentUser, currentStudent }) => {
    const isInboxTabActive = match.url.endsWith('inbox')
    const isJournalTabActive = match.url.endsWith('journal')
    const isMaterialsTabActive = match.url.endsWith('materials')
    const isSettingsTabActive = match.url.endsWith('settings')

    const getClassNames = (icon: string) => `pt-button pt-minimal pt-icon-${icon}`

    const inboxTab = createLink(`/academy/inbox`, getClassNames('inbox'),
                      isInboxTabActive, <span>Inbox</span>)
    const journalTab = createLink(`/academy/journal`, getClassNames('book'),
                      isJournalTabActive, <span>Journal</span>)
    const materialsTab = createLink(`/academy/materials`, getClassNames('folder-open'),
                      isMaterialsTabActive, <span>Materials</span>)
    const settingsTab = createLink(`/academy/settings`, getClassNames('cog'),
                      isSettingsTabActive, <span>Settings</span>)

    return (
      <div className="sa-academy-navbar pt-navbar pt-navbar-dark row">
        <div className="resume-game col-xs-2" />
        <div className="navigation-buttons pt-navbar-group pt-button-group pt-large pt-fill col-xs-10">
          {inboxTab}
          {journalTab}
          {materialsTab}
          {settingsTab}
        </div>
      </div>
    )
  }

export default Navbar
