import * as React from 'react'
import { capitalize } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { Student, Question, Answer, Assessment, Grading } from 'sa/core/types'

export type OwnProps = {
  student: Student,
} & RouteComponentProps<any>

export type Props = {
  assessment?: Assessment,
  questions?: Question[],
  answers?: Answer[],
  grading?: Grading,
} & OwnProps

const Workspace: React.StatelessComponent<Props> =
  () => (<div className="sa-workspace" />)

export default Workspace
