import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Button } from '@blueprintjs/core'
import { createLink } from 'sa/core/util'

export interface INavbarProps extends RouteComponentProps<any> {
}

export default function Navbar({ match }: INavbarProps) {

  // Control Active Tabs
  const isInboxTabActive = match.url.endsWith('inbox')
  const isJournalTabActive = match.url.endsWith('journal')
  const isFilesTabActive = match.url.endsWith('files')

  const getClassNames = (icon: string) => `pt-button pt-minimal pt-icon-${icon}`

  return (
    <div className="sa-academy-navbar pt-navbar pt-navbar-dark row">

      <div className="navigation-buttons pt-navbar-group pt-button-group pt-large pt-fill col-xs-8">
        {createLink(`/academy/inbox`, getClassNames('inbox'),
                     isInboxTabActive, <span>Inbox</span>)}
        {createLink(`/academy/journal`, getClassNames('application'),
                     isJournalTabActive, <span>Journal</span>)}
        {createLink(`/academy/files`, getClassNames('folder-open'),
                     isFilesTabActive, <span>Files</span>)}
      </div>

      <div className="pt-navbar-group col-xs end-xs">
        <div className="pt-button-group">
          <Button className="pt-minimal" iconName="notifications" />
          <Button className="pt-minimal" iconName="cog" />
        </div>
      </div>

    </div>
  )
}