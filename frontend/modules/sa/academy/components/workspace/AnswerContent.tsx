import * as React from 'react'
import { Tabs2, Tab2 } from '@blueprintjs/core'
import { Answer, Question, WorkspaceState,
  AnswerTabType } from 'sa/core/types'

import Editor, { Props as EditorProps } from './Editor'

export type Props = {
  question: Question,
  answer: Answer,
  workspace: WorkspaceState,

  handleTabChange(id: AnswerTabType): void,
  increaseEditorFontSize(): void,
  decreaseEditorFontSize(): void,
  setEditorTheme(theme: string): void,
  setAnswerValue(answer: number, value: string): void,
}

const AnswerContent: React.StatelessComponent<Props> =
  (props) => {
    const {
      question, answer, workspace, handleTabChange,
      increaseEditorFontSize, decreaseEditorFontSize,
      setEditorTheme, setAnswerValue,
    } = props

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

    const toggleLightDarkTheme = () => {
      if (workspace.editorTheme === 'github') {
        setEditorTheme('tomorrow_night')
      } else {
        setEditorTheme('github')
      }
    }

    if (workspace.activeAnswerTab === AnswerTabType.Code) {
      const editorProps: EditorProps = {
        editorTheme: workspace.editorTheme,
        editorFontSize: workspace.editorFontSize,
        increaseEditorFontSize,
        decreaseEditorFontSize,
        toggleLightDarkTheme,
        initialValue: answer.value,
        resource: answer.id,
        onCodeChange: (newValue: string) => {
          setAnswerValue(answer.id, newValue)
        },
      }
      content = <Editor {...editorProps} />
    }

    return (
      <div className="sa-answer">
        {tabs}
        <div className="tab-content row">
          {content}
        </div>
      </div>
    )
  }

export default AnswerContent
