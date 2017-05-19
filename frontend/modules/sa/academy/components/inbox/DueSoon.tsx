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
} & RouteComponentProps<any>

export type SectionProps = {
  title: string,
  assessments: Assessment[],
  gradings: {[id: number]: Grading},
}

function dueAtToString(dueAt: number): string {
  return (moment(dueAt)).format('DD MMMM')
}

const Section: React.StatelessComponent<SectionProps> =
  ({ title, assessments, gradings }) => {
    const assessmentCards = assessments.map((assessment) => {
      const grading = values(gradings)
        .find(g => g.assessment.toString() === assessment.id.toString())!

      return (
        <AssessmentCard
           key={assessment.id}
           grading={grading}
           assessment={assessment}
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
  ({missions, sidequests, paths, gradings}) => {
    const missionsDueSoon = missions && missions.length &&
      (<Section title="Missions" gradings={gradings} assessments={missions} />)

    const sidequestsDueSoon = sidequests && sidequests.length &&
      (<Section title="Sidequests" gradings={gradings} assessments={sidequests} />)

    const pathsDueSoon = paths && paths.length &&
      (<Section title="Paths" gradings={gradings} assessments={paths} />)

    return (
      <div className="sa-duesoon">
        {missionsDueSoon}
        {pathsDueSoon}
        {sidequestsDueSoon}
      </div>
    )
  }

export default DueSoon
