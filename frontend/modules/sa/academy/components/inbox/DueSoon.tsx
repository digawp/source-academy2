import * as React from 'react'
import * as moment from 'moment'
import { values } from 'lodash'
import { RouteComponentProps } from 'react-router'
import { Button, Intent, Text } from '@blueprintjs/core'

import { IAssessment, IGrading } from 'sa/core/types'
import AssessmentCard from '../assessment/AssessmentCard'

export type Props = {
  gradings: {[id: number]: IGrading}
  missions: IAssessment[]
  sidequests: IAssessment[]
  paths: IAssessment[]
} & RouteComponentProps<any>

export type SectionProps = {
  title: string
  assessments: IAssessment[]
  gradings: {[id: number]: IGrading}
}

function dueAtToString(dueAt: number): string {
  return (moment(dueAt)).format("DD MMMM")
}

const Section: React.StatelessComponent<SectionProps> =
  ({ title, assessments, gradings }) => (
    <div className="section">
      <div className="heading">{title}</div>
      {assessments.map((assessment) => {
        const grading = values(gradings).find(g =>
          g.assessment == assessment.id)!
        return <AssessmentCard
                  key={assessment.id}
                  grading={grading}
                  assessment={assessment} />
      })}
    </div>
  )

const DueSoon: React.StatelessComponent<Props> =
  ({missions, sidequests, paths, gradings}) => (
    <div className="sa-duesoon">
      { missions && missions.length &&
        (<Section title="Missions"
            gradings={gradings}
            assessments={missions} />) }
      { sidequests && sidequests.length &&
        (<Section title="Sidequests"
            gradings={gradings}
            assessments={sidequests} />) }
      { paths && paths.length && (
          <Section
            title="Paths"
            gradings={gradings}
            assessments={paths} />) }
    </div>
  )

export default DueSoon
