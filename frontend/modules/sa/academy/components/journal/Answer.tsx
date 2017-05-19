import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export type Props = {
} & RouteComponentProps<any>

export const SecondaryNavbar: React.StatelessComponent<Props> =
  (props) => (<div className="answer-navbar" />)

const Answer: React.StatelessComponent<Props> =
  () => (<div className="sa-answer" />)

export default Answer
