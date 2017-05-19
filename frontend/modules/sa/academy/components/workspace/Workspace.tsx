import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Student, Question, Answer, Assessment, Grading } from 'sa/core/types'

export type OwnProps = {
  type: 'assessment' | 'gist',
  id: number,
  student: Student,
} & RouteComponentProps<any>

export type Props = {
  assessment?: Assessment,
  questions?: Question[],
  answers?: Answer[],
  grading?: Grading,
} & OwnProps

export const SecondaryNavbar: React.StatelessComponent<Props> =
  (props) => (<div className="workspace-navbar" />)

const Workspace: React.StatelessComponent<Props> =
  () => (<div className="sa-workspace" />)

export default Workspace
