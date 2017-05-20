import * as React from 'react'
import { capitalize } from 'lodash'
import { RouteComponentProps } from 'react-router'
import { Button, IconClasses, Intent, Text } from '@blueprintjs/core'
import { Assessment } from 'sa/core/types'

export type OwnProps = RouteComponentProps<any>

export type Props = {
  assessment: Assessment,
  backToAssessments: (type: string) => void,
} & OwnProps

const WorkspaceSecondaryNavbar: React.StatelessComponent<Props> =
  ({ assessment, backToAssessments }) => {
    const handleClick = assessment && (() => backToAssessments(assessment.type))
    const backButton = assessment && (
      <Button
        onClick={handleClick}
        className="back-button pt-minimal pt-large"
        iconName={IconClasses.CHEVRON_LEFT}
      />
    )
    const title = assessment && ([
      (
        <span key="type" className="assessment-type">
          {capitalize(assessment.type)} {assessment.order}
        </span>),
      <br key="br"/>,
      <Text key="title" ellipsize={true}>{assessment.title}</Text>,
    ])
    const toolbar = assessment && (
      <div className="pt-button-group">
        <Button intent={Intent.PRIMARY} iconName={IconClasses.FLOPPY_DISK}>
          Save
        </Button>
        <Button intent={Intent.SUCCESS} iconName={IconClasses.SEND_TO}>
          Submit
        </Button>
      </div>
    )
    return (
      <div className="workspace-navbar row">
        {backButton}
        <div className="assessment-title col-xs-4">
          {title}
        </div>
        <div className="toolbar col-xs end-xs">
          {toolbar}
        </div>
      </div>
    )
  }

export default WorkspaceSecondaryNavbar
