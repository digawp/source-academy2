import * as React from 'react'
import * as moment from 'moment'
import { IAssessment } from 'sa/core/types'
import { Button, Text } from '@blueprintjs/core'

export type Props = {
  assessment: IAssessment
}

function dueAtToString(dueAt: number): string {
  return (moment(dueAt)).format("DD MMMM")
}

const AssessmentCard: React.StatelessComponent<Props> = ({ assessment }) => (
  <div className="assessment row">
    <div className="cover">
      <img src={assessment.coverPicture} />
    </div>
    <div className="description col-xs">
      <h4>{assessment.title}</h4>
      <h6 className="order">
         {assessment.type.toUpperCase()} {assessment.order} | 400XP
      </h6>
      <Text>{assessment.description}</Text>
      <div className="row controls">
        <div className="due-at col-xs-6 col-md-8">
          <Button disabled className="pt-minimal" iconName="time">
            <b>{dueAtToString(assessment.dueAt)}</b>
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
)

export default AssessmentCard
