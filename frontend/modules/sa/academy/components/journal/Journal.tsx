import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { IAssessment } from 'sa/core/types'

import NotFound from 'sa/core/components/NotFound'
import SecondaryNavbar from '../SecondaryNavbar'
import AssessmentsContainer from '../../containers/journal/AssessmentsContainer'
import AnswerContainer from '../../containers/journal/AnswerContainer'
import { Navbar as AssessmentsNavbar } from './Assessments'
import { Navbar as AnswerNavbar } from './Answer'

export type Props = {
  assessments: {[id: number]: IAssessment}
} & RouteComponentProps<any>

const Journal: React.StatelessComponent<Props> =
  ({ match }) => (
    <div className="sa-journal">
      <SecondaryNavbar>
        <Switch>
          <Redirect exact path={match.url} to={`${match.url}/assessments/missions`} />
          <Route path={`${match.url}/assessments/:tab`}
                 component={AssessmentsNavbar} />
          <Route path={`${match.url}/answers/:id`} component={AnswerNavbar} />
          <Route component={AssessmentsNavbar} />
        </Switch>
      </SecondaryNavbar>
      <div className="journal-content">
        <Switch>
          <Redirect exact path={match.url} to={`${match.url}/assessments/missions`} />
          <Route path={`${match.url}/assessments/:tab`}
                 component={AssessmentsContainer} />
          <Route path={`${match.url}/answers/:id`}
                 component={AnswerContainer} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>

  )

export default Journal
