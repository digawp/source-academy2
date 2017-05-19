import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Assessment } from 'sa/core/types'

import NotFound from 'sa/core/components/NotFound'
import AssessmentsContainer from '../../containers/journal/AssessmentsContainer'
import AnswerContainer from '../../containers/journal/AnswerContainer'
import { SecondaryNavbar as AssessmentsNavbar } from './Assessments'
import { SecondaryNavbar as AnswerNavbar } from './Answer'

export type Props = {
  assessments: {[id: number]: Assessment},
} & RouteComponentProps<any>

export const SecondaryNavbar: React.StatelessComponent<Props> =
  ({ match }) => (
    <Switch>
      <Redirect exact={true} path={match.url} to={`${match.url}/assessments/missions`} />
      <Route path={`${match.url}/assessments/:tab`} component={AssessmentsNavbar} />
      <Route path={`${match.url}/answers/:id`} component={AnswerNavbar} />
      <Route component={AssessmentsNavbar} />
    </Switch>
  )

const Journal: React.StatelessComponent<Props> =
  ({ match }) => (
    <div className="sa-journal">
      <Switch>
        <Redirect exact={true} path={match.url} to={`${match.url}/assessments/missions`} />
        <Route path={`${match.url}/assessments/:tab`} component={AssessmentsContainer} />
        <Route path={`${match.url}/answers/:id`} component={AnswerContainer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )

export default Journal
