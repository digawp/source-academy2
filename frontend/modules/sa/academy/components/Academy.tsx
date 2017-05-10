import * as React from 'react'
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import NotFound from 'sa/core/components/NotFound'
import Navbar from './Navbar'
import Materials from './materials/Materials'
import Missions from './missions/Missions'
import Inbox from './inbox/Inbox'
import {InboxState} from '../ducks/inbox'

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
          <Route path='/academy/missions' component={Missions} />
          <Route path='/academy/materials' component={Materials} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  )
}