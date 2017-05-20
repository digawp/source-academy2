import * as React from 'react'
import { capitalize } from 'lodash'
import { RouteComponentProps } from 'react-router'
import { Button, IconClasses, Intent, Text,
  Popover, Menu, MenuItem, Position } from '@blueprintjs/core'
import { Assessment, LayoutType, WorkspaceState } from 'sa/core/types'

export type OwnProps = RouteComponentProps<any>

export type Props = {
  assessment: Assessment,
  workspace: WorkspaceState,

  backToAssessments(type: string): void,
  setLayoutType(layoutType: LayoutType): void,
} & OwnProps

const WorkspaceSecondaryNavbar: React.StatelessComponent<Props> =
  ({ assessment, workspace, backToAssessments, setLayoutType }) => {
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

    const labelOfLayoutType = {
      [LayoutType.AnswerOnly]: 'Answer Only',
      [LayoutType.QuestionOnly]: 'Question Only',
      [LayoutType.SplitHorizontal]: 'Split Horizontal',
    }

    let selectLayoutButton: React.ReactNode = null

    if (workspace) {
      const onClickAnswerOnly = () => setLayoutType(LayoutType.AnswerOnly)
      const onClickQuestionOnly = () => setLayoutType(LayoutType.QuestionOnly)
      const onClickSplitHorizontal = () => setLayoutType(LayoutType.SplitHorizontal)

      const layoutMenu = (
        <Menu>
          <MenuItem onClick={onClickAnswerOnly} text={labelOfLayoutType[LayoutType.AnswerOnly]} />
          <MenuItem onClick={onClickQuestionOnly} text={labelOfLayoutType[LayoutType.QuestionOnly]} />
          <MenuItem onClick={onClickSplitHorizontal} text={labelOfLayoutType[LayoutType.SplitHorizontal]} />
        </Menu>
      )
      selectLayoutButton = (
        <Popover content={layoutMenu} position={Position.BOTTOM}>
          <Button className="pt-minimal" iconName={IconClasses.CONTROL}>
            {labelOfLayoutType[workspace.layoutType]}
          </Button>
        </Popover>
      )
    }

    const toolbar = assessment && (
      <div className="pt-button-group">
        {selectLayoutButton}
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
