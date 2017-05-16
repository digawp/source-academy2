import * as React from 'react'
import * as classnames from 'classnames'
import { Button, ITreeNode } from '@blueprintjs/core'
import { Link } from 'react-router-dom'

export type Props = {
  activeTab: string
}

export type TabProps = {
  id: string
  label: string
  iconName: string
  isActive: boolean
}

const tabClassNames = (props: TabProps) =>
  classnames(
    "pt-button",
    "pt-minimal",
    "pt-icon",
    `pt-icon-${props.iconName}`,
    { "pt-active": props.isActive }
  )

const Tab: React.StatelessComponent<TabProps> = (props) => (
  <Link to={props.id} className={tabClassNames(props)}>
    <span>{props.label}</span>
  </Link>
)

const Navbar: React.StatelessComponent<Props> = ({ activeTab }) => {

  const _tabs: Partial<TabProps>[] = [
    { id: "soon", label: "Due Soon", iconName: "time" },
    { id: "announcements", label: "Announcements", iconName: "feed" },
    { id: "happenings", label: "Happenings", iconName: "people" },
    { id: "comments", label: "Comments", iconName: "comment" }
  ]

  const tabs: TabProps[] = _tabs.map((t) => ({
    ...t, isActive: t.id! === activeTab
  } as TabProps))

  return (
    <div className="navbar">
      <div className="pt-button-group">
        { tabs.map(t => <Tab key={t.id} {...t} />) }
      </div>
    </div>
  )
}

export default Navbar
