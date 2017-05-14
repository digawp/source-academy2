import * as React from 'react'
import { Tree, ITreeNodeProps } from '@blueprintjs/core'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import DueSoon from './DueSoon'
import {InboxState, setInboxActiveTopic} from '../../ducks/inbox'

export interface IInboxProps extends RouteComponentProps<any> {
  inbox: InboxState
  setInboxActiveTopic: (topic: string) => void
}

const Inbox = ({ inbox, setInboxActiveTopic, location}: IInboxProps) => {
  const params = new URLSearchParams(location.search)
  const activeTopic = params.get('topic') || 'soon'

  let element = null

  if (activeTopic === 'soon') {
    element = <DueSoon />
  }

  return (
    <div className="sa-inbox row">
      <div className="sidebar-container col-xs-3">
        <Sidebar
          activeTopic={activeTopic}
          setInboxActiveTopic={setInboxActiveTopic}/>
      </div>
      <div className="inbox-content col-xs">
        { element } 
      </div>
    </div>
  )
}

export default connect((state) => ({
  inbox: state.inbox
}), {
  setInboxActiveTopic
})(Inbox) as any