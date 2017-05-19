import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Question, Answer, Assessment } from 'sa/core/types'

export type OwnProps = {
  type: 'assessment' | 'gist',
  id: number,
} & RouteComponentProps<any>

export type Props = {
  assessment?: Assessment,
  questions?: Question[],
  answers?: {[id: number]: Answer},
} & OwnProps

export const SecondaryNavbar: React.StatelessComponent<Props> =
  (props) => (<div className="workspace-navbar" />)

const Workspace: React.StatelessComponent<Props> =
  () => (<div className="sa-workspace" />)

export default Workspace
