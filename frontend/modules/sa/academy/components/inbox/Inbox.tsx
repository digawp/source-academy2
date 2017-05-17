import * as classnames from 'classnames'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import SecondaryNavbar from '../SecondaryNavbar'
import DueSoonContainer from '../../containers/inbox/DueSoonContainer'
import AnnouncementsContainer from '../../containers/inbox/AnnouncementsContainer'
import HappeningsContainer from '../../containers/inbox/HappeningsContainer'
import SecondaryTab, { Props as SecondaryTabProps } from '../SecondaryTab'
import NotFound from 'sa/core/components/NotFound'

export type Props = RouteComponentProps<any>

const Inbox: React.StatelessComponent<Props> = ({ location, match }) => {
  const paths = location.pathname.split('/')
  const activeTab = paths[paths.length - 1]

  const _tabs: Partial<SecondaryTabProps>[] = [
    { id: "soon", label: "Due Soon", iconName: "time" },
    { id: "announcements", label: "Announcements", iconName: "feed" },
    { id: "happenings", label: "Happenings", iconName: "people" },
    { id: "comments", label: "Comments", iconName: "comment" }
  ]

  const tabs: SecondaryTabProps[] = _tabs.map((t) => ({
    ...t, isActive: t.id! === activeTab
  } as SecondaryTabProps))

  return (
    <div className="sa-inbox">
      <SecondaryNavbar>
        <div className="pt-button-group">
          { tabs.map(t => <SecondaryTab key={t.id} {...t} />) }
        </div>
      </SecondaryNavbar>
      <div className="inbox-content">
        <Switch>
          <Redirect exact path={match.url} to={`${match.url}/soon`} />
          <Route path={`${match.url}/soon`} component={DueSoonContainer} />
          <Route path={`${match.url}/announcements`} component={AnnouncementsContainer} />
          <Route path={`${match.url}/happenings`} component={HappeningsContainer} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  )
}

export default Inbox
