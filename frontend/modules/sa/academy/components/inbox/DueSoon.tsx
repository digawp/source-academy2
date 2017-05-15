import * as React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { IAssessment } from 'sa/core/types'
import { List, Map } from 'immutable'
import { Button, Intent, Text } from '@blueprintjs/core'

import AssessmentCard from '../assessment/AssessmentCard'

export interface IDueSoonProps {
  missions: List<IAssessment>
  sidequests: List<IAssessment>
  paths: List<IAssessment>
}

interface IDueSoonSectionProps {
  title: string
  assessments: List<IAssessment>
}

function dueAtToString(dueAt: number): string {
  return (moment(dueAt)).format("DD MMMM")
}

const Section = ({ title, assessments }: IDueSoonSectionProps) => (
  <div className="section">
    <div className="heading">{title}</div>
    {assessments.map((assessment: IAssessment) =>
      <AssessmentCard assessment={assessment} />)}
  </div>
)

const DueSoon = (props: IDueSoonProps) => (
  <div className="sa-duesoon">
    { props.missions && !props.missions.isEmpty() &&
      (<Section title="Missions" assessments={props.missions} />) }
    { props.sidequests && !props.sidequests.isEmpty() &&
      (<Section title="Sidequests" assessments={props.sidequests} />) }
    { props.paths && !props.paths.isEmpty() &&
      (<Section title="Paths" assessments={props.paths} />) }
  </div>
)

const selectDueSoon = (assessments: Map<string, IAssessment>, type: string) => {
  return assessments.toList().filter(
    (a: IAssessment) => {
      if (a.type !== type) {
        return false
      } else {
        const due = moment(a.dueAt)
        const now = moment()
        return due.subtract(7, 'days').startOf('day').isBefore(now)
      }
    })
}

const mapStateToProps = (state: any) => ({
  sidequests: selectDueSoon(state.assessment, 'sidequest'),
  paths: selectDueSoon(state.assessment, 'path'),
  missions: selectDueSoon(state.assessment, 'mission') 
})

export default connect(mapStateToProps)(DueSoon) as any
