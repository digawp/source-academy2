import * as React from 'react'
import * as moment from 'moment'
import { values } from 'lodash'
import { RouteComponentProps } from 'react-router'
import { Button, Intent, Text } from '@blueprintjs/core'

import { Assessment, Grading } from 'sa/core/types'
import AssessmentCard from '../assessment/AssessmentCard'

export type Props = {
  gradings: {[id: number]: Grading},
  missions: Assessment[],
  sidequests: Assessment[],
  paths: Assessment[],
} & OwnProps

export type OwnProps = {
  viewAssessment: (assessment: number, student?: number) => void,
} & RouteComponentProps<any>

export type SectionProps = {
  title: string,
  assessments: Assessment[],
} & Props

function dueAtToString(dueAt: number): string {
  return (moment(dueAt)).format('DD MMMM')
}

const Section: React.StatelessComponent<SectionProps> =
  ({ title, assessments, gradings, viewAssessment }) => {
    const assessmentCards = assessments.map((assessment) => {
      const grading = values(gradings)
        .find(g => g.assessment.toString() === assessment.id.toString())!
      const handleView = () => viewAssessment(assessment.id)

      return (
        <AssessmentCard
           key={assessment.id}
           grading={grading}
           assessment={assessment}
           handleView={handleView}
        />
      )
    })

    return (
      <div className="section">
        <div className="heading">{title}</div>
        {assessmentCards}
      </div>
    )
  }

const DueSoon: React.StatelessComponent<Props> =
  (props) => {
    const { missions, sidequests, paths, gradings } = props
    const missionsDueSoon = missions && missions.length &&
      (<Section title="Missions" assessments={missions} {...props} />)

    const sidequestsDueSoon = sidequests && sidequests.length &&
      (<Section title="Sidequests" assessments={sidequests} {...props} />)

    const pathsDueSoon = paths && paths.length &&
      (<Section title="Paths" assessments={paths} {...props} />)

    return (
      <div className="sa-duesoon">
        {missionsDueSoon}
        {pathsDueSoon}
        {sidequestsDueSoon}
      </div>
    )
  }

export default DueSoon
