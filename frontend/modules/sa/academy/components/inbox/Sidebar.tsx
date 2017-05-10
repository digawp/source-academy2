import * as React from 'react'
import { Tree, ITreeNode } from '@blueprintjs/core'

export interface ISidebarProps {
  activeTopic: string

  setInboxActiveTopic: (topic: string) => void
}

export default function Sidebar({
   activeTopic, setInboxActiveTopic }: ISidebarProps) {
  
  const nodes: ITreeNode[] = [
    { id: "soon", label: "Due Soon", iconName: "time",
      isSelected:  activeTopic === "soon" },
    { id: "announcements", label: "Announcements", iconName: "feed",
      isSelected: activeTopic === "announcements" },
    { id: "happenings", label: "Happenings", iconName: "people",
      isSelected: activeTopic === "happenings" },
    { id: "comments", label: "Comments", iconName: "comment",
      isSelected: activeTopic === "comments" }
  ]

  return (
    <div className="sidebar">
      <h5 className="heading">Topics</h5>
      <Tree contents={nodes} onNodeClick={(node) => {
        setInboxActiveTopic(node.id as string)
      }} />
    </div>
  )
}
