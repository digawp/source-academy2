import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button } from '@blueprintjs/core'

import { IAssessment } from 'sa/core/types'
import AssessmentCard from '../assessment/AssessmentCard'
import SecondaryTab, {Props as SecondaryTabProps} from '../SecondaryTab'

export type Props = {
  assessments: IAssessment[]
} & RouteComponentProps<any>

export type NavbarProps = RouteComponentProps<any>

export const Navbar: React.StatelessComponent<NavbarProps> =
  ({ location }) => {
    const paths = location.pathname.split('/')
    const activeTab = paths[paths.length - 1]

    const _tabs: Partial<SecondaryTabProps>[] = [
      { id: "missions", label: "Missions", iconName: "filter" },
      { id: "sidequests", label: "Sidequests", iconName: "filter" },
      { id: "paths", label: "Paths", iconName: "filter" },
    ]

    const tabs: SecondaryTabProps[] = _tabs.map((t) => ({
      ...t, isActive: t.id! === activeTab
    } as SecondaryTabProps))
   
    return (
      <div className="pt-button-group">
        {tabs.map(t => <SecondaryTab key={t.id} {...t} />)}
      </div>
    )
  }

const Assessments: React.StatelessComponent<Props> =
  ({ assessments }) => (
    <div className="assessment-list">
      { assessments && assessments.map(assessment =>
          <AssessmentCard
            key={assessment.id}
            assessment={assessment} />) }
    </div>
  )

export default Assessments