import * as React from 'react'
import * as classnames from 'classnames'

import { Link } from 'react-router-dom'

export type SecondaryTabProps = {
  id: string
  label: string
  iconName: string
  isActive: boolean
}

const tabClassNames = (props: SecondaryTabProps) =>
  classnames(
    "pt-button",
    "pt-minimal",
    "pt-icon",
    `pt-icon-${props.iconName}`,
    { "pt-active": props.isActive }
  )

const SecondaryTab: React.StatelessComponent<SecondaryTabProps> = (props) => (
  <Link to={props.id} className={tabClassNames(props)}>
    <span>{props.label}</span>
  </Link>
)

export default SecondaryTab