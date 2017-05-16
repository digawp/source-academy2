import * as React from 'react'
import * as classnames from 'classnames'
import { Button, ITreeNode } from '@blueprintjs/core'

export type Props = {
  activeTab: string
  onTabClick: (topic: string) => void
}

export type TabProps = {
  id: string
  label: string
  iconName: string
  isActive: boolean
  onClick: (id: string) => void
}

const Tab: React.StatelessComponent<TabProps> = ({ id, iconName, isActive, label, onClick }) => (
  <Button
      className={classnames("pt-minimal", { "pt-active": isActive })}
      iconName={iconName} onClick={() => onClick(id)}>
    {label}
  </Button>
)

const Navbar: React.StatelessComponent<Props> = ({ activeTab, onTabClick }) => {

  const _tabs: Partial<TabProps>[] = [
    { id: "soon", label: "Due Soon", iconName: "time" },
    { id: "announcements", label: "Announcements", iconName: "feed" },
    { id: "happenings", label: "Happenings", iconName: "people" },
    { id: "comments", label: "Comments", iconName: "comment" }
  ]

  const tabs: TabProps[] = _tabs.map((t) => ({
    ...t, isActive: t.id! === activeTab, onClick: onTabClick
  } as TabProps))

  return (
    <div className="navbar">
      <div className="pt-button-group">
        { tabs.map(t => <Tab {...t} />) }
      </div>
    </div>
  )
}

export default Navbar
