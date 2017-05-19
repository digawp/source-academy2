import * as React from 'react'
import { values } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { Button } from '@blueprintjs/core'

import { Assessment, Grading } from 'sa/core/types'
import AssessmentCard from '../assessment/AssessmentCard'
import SecondaryTab, {Props as SecondaryTabProps} from '../SecondaryTab'

export type Props = {
  assessments: Assessment[]
  gradings: {[id: number]: Grading},
} & RouteComponentProps<any>

export type NavbarProps = RouteComponentProps<any>

export const Navbar: React.StatelessComponent<NavbarProps> =
  ({ location }) => {
    const paths = location.pathname.split('/')
    const activeTab = paths[paths.length - 1]

    const tabs: SecondaryTabProps[] = [
      { id: 'missions', label: 'Missions', iconName: 'filter',
        isActive: activeTab === 'missions' },
      { id: 'sidequests', label: 'Sidequests', iconName: 'filter',
        isActive: activeTab === 'sidequests' },
      { id: 'paths', label: 'Paths', iconName: 'filter',
        isActive: activeTab === 'paths' },
    ]

    return (
      <div className="pt-button-group">
        {tabs.map(t => <SecondaryTab key={t.id} {...t} />)}
      </div>
    )
  }

const Assessments: React.StatelessComponent<Props> =
  ({ assessments, gradings }) => {
    const assessmentCards = assessments && assessments.map(assessment => (
      <AssessmentCard
        grading={values(gradings).find(g => g.assessment === assessment.id)!}
        key={assessment.id}
        assessment={assessment}
      />
    ))

    return (
      <div className="assessment-list">
        {assessmentCards}
      </div>
    )
  }

export default Assessments
