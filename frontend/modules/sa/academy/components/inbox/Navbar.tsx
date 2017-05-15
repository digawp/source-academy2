import * as React from 'react'
import * as classnames from 'classnames'
import { Button, ITreeNode } from '@blueprintjs/core'

export interface INavbarProps {
  activeTopic: string
  setInboxActiveTopic: (topic: string) => void
}


export default function Navbar({ activeTopic, setInboxActiveTopic }: INavbarProps) {
  
  const makeButton = (node: ITreeNode) => (
    <Button
      key={node.id}
      iconName={node.iconName}
      onClick={() => setInboxActiveTopic(node.id.toString())}
      className={classnames("pt-minimal", {
      "pt-active": (activeTopic === node.id)
    })}>{node.label}</Button>
  )

  const nodes: ITreeNode[] = [
    { id: "soon", label: "Due Soon", iconName: "time" },
    { id: "announcements", label: "Announcements", iconName: "feed" },
    { id: "happenings", label: "Happenings", iconName: "people" },
    { id: "comments", label: "Comments", iconName: "comment" }
  ]

  return (
    <div className="navbar">
      <div className="pt-button-group">
        { nodes.map(makeButton) }
      </div>
    </div>
  )
}
