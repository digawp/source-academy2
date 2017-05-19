import * as React from 'react'
import * as moment from 'moment'
import * as classnames from 'classnames'
import { Assessment, Grading } from 'sa/core/types'
import { Button, Text, Intent } from '@blueprintjs/core'

export type Props = {
  assessment: Assessment,
  grading: Grading,
}

function dueAtToString(dueAt: number): string {
  return (moment(dueAt)).format('DD MMMM')
}

const getActionName = (grading: Grading) => {
  switch (grading.status) {
    case 'locked':
      return 'Locked'
    case 'unlocked':
      return 'Attempt'
    case 'submitted':
      return 'Submitted'
    case 'graded':
      return 'Graded'
    default:
      return 'Locked'
  }
}

const getIntent = (grading: Grading) => {
  if (grading.status === 'unlocked') {
    return Intent.SUCCESS
  } else if (grading.status === 'graded') {
    return Intent.PRIMARY
  } else {
    return Intent.NONE
  }
}

const Cover: React.StatelessComponent<Props> =
  ({ grading, assessment }) => (
    <div className="cover">
      {grading && <img src={assessment.coverPicture} />}
    </div>
  )

const Description: React.StatelessComponent<Props> =
   ({ grading, assessment }) => {
    const actionButton = grading && (
        <Button
          disabled={grading.status === 'locked'}
          intent={getIntent(grading)}
          className="pt-minimal continue-button pt-large"
        >
          {getActionName(grading)}
        </Button>
    )

    return (
      <div className="description col-xs">
        <h4>{assessment.title}</h4>
        <h6 className="order">
          {assessment.type.toUpperCase()} {assessment.order} | 400XP
        </h6>
        <Text>{assessment.description}</Text>
        <div className="row controls">
          <div className="due-at col-xs-6 col-md-8">
            <Button disabled={true} className="pt-minimal" iconName="time">
              <b>{dueAtToString(assessment.dueAt)}</b>
            </Button>
          </div>
          <div className="col-xs">
            {actionButton}
          </div>
        </div>
      </div>
    )
   }

const AssessmentCard: React.StatelessComponent<Props> =
  (props) => (
    <div className="assessment row">
      <Cover {...props} />
      <Description {...props} />
    </div>
  )

export default AssessmentCard
