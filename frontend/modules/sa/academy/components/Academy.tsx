import * as React from 'react'
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import NotFound from 'sa/core/components/NotFound'
import Navbar from './Navbar'
import Files from './files/Files'
import Journal from './journal/Journal'
import Inbox from './inbox/Inbox'

export interface IAcademyProps extends RouteComponentProps<any> {
}

export default function Academy(props: IAcademyProps) {
  return (
    <div className="sa-academy">
      <Navbar {...props}/>
      <div className="content">
        <Switch>
          <Redirect exact path='/academy' to='/academy/news' />
          <Route path='/academy/inbox' component={Inbox} />
          <Route path='/academy/journal' component={Journal} />
          <Route path='/academy/files' component={Files} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  )
}