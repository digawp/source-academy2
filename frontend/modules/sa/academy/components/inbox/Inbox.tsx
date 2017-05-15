import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import Navbar from './Navbar'
import DueSoon from './DueSoon'
import {setInboxActiveTopic} from '../../reducers/inbox'

export interface Props extends RouteComponentProps<any> {
  setInboxActiveTopic: (topic: string) => void
}

const Inbox: React.StatelessComponent<Props> = ({ setInboxActiveTopic, location}) => {
  const params = new URLSearchParams(location.search)
  const activeTopic = params.get('topic') || 'soon'

  let element = null

  if (activeTopic === 'soon') {
    element = <DueSoon />
  }

  return (
    <div className="sa-inbox">
      <Navbar activeTab={activeTopic} onTabClick={setInboxActiveTopic}/>
      <div className="inbox-content">
        { element }
      </div>
    </div>
  )
}

export default connect((state) => ({}), { setInboxActiveTopic })(Inbox)
