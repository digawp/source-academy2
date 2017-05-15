import * as React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { IAssessment } from 'sa/core/types'
import { List, Map } from 'immutable'
import { Button, Intent, Text } from '@blueprintjs/core'

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
    {assessments.map((a: IAssessment) => (
      <div className="assessment row">
        <div className="cover">
          <img src={a.coverPicture} />
        </div>
        <div className="description col-xs">
          <h4>{a.title}</h4>
          <h6 className="order">{a.type.toUpperCase()} {a.order} | 400XP</h6>
          <Text>{a.description}</Text>
          <div className="row controls">
            <div className="due-at col-xs-6 col-md-8">
              <Button disabled className="pt-minimal" iconName="time">
                <b>{dueAtToString(a.dueAt)}</b>
              </Button>
            </div>
            <div className="col-xs">
              <Button className="pt-minimal continue-button pt-large">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    ))}
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
