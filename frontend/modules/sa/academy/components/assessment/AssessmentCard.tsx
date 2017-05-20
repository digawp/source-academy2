import * as React from 'react'
import * as moment from 'moment'
import * as classnames from 'classnames'
import { Assessment, Grading } from 'sa/core/types'
import { Button, Text, Intent } from '@blueprintjs/core'

export type Props = {
  assessment: Assessment,
  grading: Grading,

  handleView: () => void,
}

function dueAtToString(dueAt: number): string {
  return 'Due ' + moment(dueAt).fromNow()
}

const getActionName = (grading: Grading) => {
  switch (grading.status) {
    case 'locked':
      return 'Locked'
    case 'unlocked':
      return 'Attempt'
    case 'submitted':
      return 'View Answer'
    case 'graded':
      return 'View Grading'
    default:
      return 'Locked'
  }
}

const getActionButtonClassNames = (grading: Grading) =>
  classnames('pt-minimal', 'pt-large', grading.status)

const Cover: React.StatelessComponent<Props> =
  ({ grading, assessment }) => (
    <div className="cover">
      {grading && <img src={assessment.coverPicture} />}
    </div>
  )

const Description: React.StatelessComponent<Props> =
   ({ grading, assessment, handleView }) => {
    const assessmentDone = (grading.status === 'graded' || grading.status === 'submitted') 
    const actionButton = grading && (
        <Button
          disabled={grading.status === 'locked'}
          onClick={handleView}
          className={getActionButtonClassNames(grading)}
        >
          {getActionName(grading)}
        </Button>
    )

    const leftIcon = assessmentDone ? 'tick' : 'time'
    const leftLabel = assessmentDone ? 'Finished' : dueAtToString(assessment.dueAt)

    return (
      <div className="description col-xs">
        <h4>{assessment.title}</h4>
        <h6 className="order">
          {assessment.type.toUpperCase()} {assessment.order} | {assessment.maxExperience}XP
        </h6>
        <Text>{assessment.description}</Text>
        <div className="row controls">
          <div className="due-at col-xs-6 col-md-8">
            <span className={`pt-icons pt-icon-${leftIcon}`} />
            {leftLabel}
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
    <div className="sa-assessment-card row">
      <Cover {...props} />
      <Description {...props} />
    </div>
  )

export default AssessmentCard
