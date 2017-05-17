import * as React from 'react'
import * as moment from 'moment'
import { RouteComponentProps } from 'react-router'
import { Button, Intent, Text } from '@blueprintjs/core'

import { IAssessment } from 'sa/core/types'
import AssessmentCard from '../assessment/AssessmentCard'

export type Props = {
  missions: IAssessment[]
  sidequests: IAssessment[]
  paths: IAssessment[]
} & RouteComponentProps<any>

export type SectionProps = {
  title: string
  assessments: IAssessment[]
}

function dueAtToString(dueAt: number): string {
  return (moment(dueAt)).format("DD MMMM")
}

const Section: React.StatelessComponent<SectionProps> =
  ({ title, assessments }) => (
    <div className="section">
      <div className="heading">{title}</div>
      {assessments.map((assessment) => <AssessmentCard key={assessment.id}
          assessment={assessment} />)}
    </div>
  )

const DueSoon: React.StatelessComponent<Props> =
  ({missions, sidequests, paths}) => (
    <div className="sa-duesoon">
      { missions && missions.length &&
        (<Section title="Missions" assessments={missions} />) }
      { sidequests && sidequests.length &&
        (<Section title="Sidequests" assessments={sidequests} />) }
      { paths && paths.length && (<Section title="Paths" assessments={paths} />) }
    </div>
  )

export default DueSoon
