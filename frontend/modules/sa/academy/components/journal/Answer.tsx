import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export type Props = {
} & RouteComponentProps<any>

export const Navbar: React.StatelessComponent<Props> =
  (props) => (<div className="answer-navbar"></div>)

const Answer: React.StatelessComponent<Props> =
  () => (
    <div className="sa-answer">
    </div>
  )

export default Answer
