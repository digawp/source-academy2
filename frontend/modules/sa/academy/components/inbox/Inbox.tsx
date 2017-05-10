import * as React from 'react'
import { Tree, ITreeNodeProps } from '@blueprintjs/core'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import {InboxState, setInboxActiveTopic} from '../../ducks/inbox'

export interface IInboxProps {
  inbox: InboxState
  setInboxActiveTopic: (topic: string) => void
}

const Inbox = ({ inbox, setInboxActiveTopic}: IInboxProps) => {
  const { activeTopic } = inbox

  return (
    <div className="sa-inbox row">
      <div className="sidebar-container col-xs-3">
        <Sidebar
          activeTopic={activeTopic}
          setInboxActiveTopic={setInboxActiveTopic}/>
      </div>
      <div className="inbox-content col-xs">
      </div>
    </div>
  )
}

export default connect((state) => ({
  inbox: state.inbox
}), {
  setInboxActiveTopic
})(Inbox)