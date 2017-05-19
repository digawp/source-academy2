import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Assessment } from 'sa/core/types'

import NotFound from 'sa/core/components/NotFound'
import AssessmentsContainer from '../../containers/journal/AssessmentsContainer'
import WorkspaceContainer, {
  SecondaryWorkspaceNavbarContainer,
} from '../../containers/workspace/WorkspaceContainer'
import { SecondaryNavbar as AssessmentsNavbar } from './Assessments'

export type Props = {
  assessments: {[id: number]: Assessment},
} & RouteComponentProps<any>

export const SecondaryNavbar: React.StatelessComponent<Props> =
  ({ match }) => (
    <Switch>
      <Redirect exact={true} path={match.url} to={`${match.url}/assessments/missions`} />
      <Route path={`${match.url}/assessments/:tab`} component={AssessmentsNavbar} />
      <Route
        path={`${match.url}/workspaces/:id`}
        component={SecondaryWorkspaceNavbarContainer}
      />
      <Route component={AssessmentsNavbar} />
    </Switch>
  )

const Journal: React.StatelessComponent<Props> =
  ({ match }) => (
    <div className="sa-journal">
      <Switch>
        <Redirect exact={true} path={match.url} to={`${match.url}/assessments/missions`} />
        <Route path={`${match.url}/assessments/:tab`} component={AssessmentsContainer} />
        <Route path={`${match.url}/workspaces/:id`} component={WorkspaceContainer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )

export default Journal
