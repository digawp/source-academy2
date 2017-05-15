import * as React from 'react'
import * as classnames from 'classnames'
import { Button, ITreeNode } from '@blueprintjs/core'

export interface INavbarProps {
  activeTab: string
  onTabClick: (topic: string) => void
}

export default function Navbar({ activeTab, onTabClick }: INavbarProps) {
  
  const renderTab = (tab: ITreeNode) => (
    <Button
      key={tab.id}
      iconName={tab.iconName}
      onClick={() => onTabClick(tab.id.toString())}
      className={classnames("pt-minimal", {
      "pt-active": (activeTab === tab.id)
    })}>{tab.label}</Button>
  )

  const tabs: ITreeNode[] = [
    { id: "soon", label: "Due Soon", iconName: "time" },
    { id: "announcements", label: "Announcements", iconName: "feed" },
    { id: "happenings", label: "Happenings", iconName: "people" },
    { id: "comments", label: "Comments", iconName: "comment" }
  ]

  return (
    <div className="navbar">
      <div className="pt-button-group">
        { tabs.map(renderTab) }
      </div>
    </div>
  )
}
