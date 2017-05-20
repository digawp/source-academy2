import * as React from 'react'
import { Tabs2, Tab2 } from '@blueprintjs/core'
import { Answer, Question, WorkspaceState,
  AnswerTabType } from 'sa/core/types'

import Editor from './Editor'

export type Props = {
  question: Question,
  answer: Answer,
  workspace: WorkspaceState,

  handleTabChange(id: AnswerTabType): void,
}

const AnswerContent: React.StatelessComponent<Props> =
  ({ question, answer, workspace, handleTabChange }) => {
    const tabs = (
      <Tabs2
        id="answer-tab"
        onChange={handleTabChange}
        animate={true}
        selectedTabId={workspace.activeAnswerTab}
        className="answer-tab row"
      >
        <Tab2 id={AnswerTabType.Code}>
          <span className="pt-icons pt-icon-code" />
        </Tab2>
        <Tab2 id={AnswerTabType.Interpreter}>
          <span className="pt-icons pt-icon-control" />
        </Tab2>
        <Tab2 id={AnswerTabType.Comments}>
          <span className="pt-icons pt-icon-comment" />
        </Tab2>
      </Tabs2>
    )

    let content: React.ReactNode = null

    if (workspace.activeAnswerTab === AnswerTabType.Code) {
      content = <Editor />
    }

    return (
      <div className="sa-answer">
        {tabs}
        <div className="row">
          {content}
        </div>
      </div>
    )
  }

export default AnswerContent
