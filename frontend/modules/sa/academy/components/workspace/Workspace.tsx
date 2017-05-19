import * as React from 'react'
import { capitalize } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { Button, IconClasses, Intent, Text } from '@blueprintjs/core'
import { Student, Question, Answer, Assessment, Grading } from 'sa/core/types'

export type NavbarOwnProps = RouteComponentProps<any>

export type OwnProps = {
  student: Student,
} & RouteComponentProps<any>

export type Props = {
  assessment?: Assessment,
  questions?: Question[],
  answers?: Answer[],
  grading?: Grading,
} & OwnProps

export type NavbarProps = {
  backToAssessments: (type: string) => void,
} & Props

export const SecondaryNavbar: React.StatelessComponent<NavbarProps> =
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
        <span className="assessment-type">
          {capitalize(assessment.type)} {assessment.order}
        </span>),
      <br/>,
      <Text ellipsize={true}>{assessment.title}</Text>,
    ])
    const toolbar = assessment && (
      <div className="pt-button-group">
        <Button className="pt-minimal" iconName={IconClasses.LIST_DETAIL_VIEW}>
          Sidebar
        </Button>
        <Button intent={Intent.PRIMARY} iconName={IconClasses.FLOPPY_DISK} />
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

const Workspace: React.StatelessComponent<Props> =
  () => (<div className="sa-workspace" />)

export default Workspace
