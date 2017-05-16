import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { push } from 'react-router-redux'

import Navbar from './Navbar'
import DueSoon from './DueSoon'
import Announcement from './Announcement'
import NotFound from 'sa/core/components/NotFound'

export interface Props extends RouteComponentProps<any> {
}

const Inbox: React.StatelessComponent<Props> = ({ location, match }) => {
  const paths = location.pathname.split('/')
  const activeTab = paths[paths.length - 1]

  return (
    <div className="sa-inbox">
      <Navbar activeTab={activeTab} />
      <div className="inbox-content">
        <Switch>
          <Redirect exact path='/academy/inbox' to='/academy/inbox/soon' />
          <Route path={`${match.url}/soon`} component={DueSoon} />
          <Route path={`${match.url}/announcements`} component={Announcement} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  )
}

export default Inbox
