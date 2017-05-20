import * as React from 'react'
import { capitalize } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { Slider, Button, IconClasses } from '@blueprintjs/core'
import { Student, Question, Answer, Assessment,
  Grading, WorkspaceState, LayoutType, AnswerTabType } from 'sa/core/types'

import QuestionsSlider from './QuestionsSlider'
import AnswerContent from './AnswerContent'

export type OwnProps = {
  student: Student,
} & RouteComponentProps<any>

export type Props = {
  workspace: WorkspaceState,
  assessment?: Assessment,
  questions?: Question[],
  answers?: Answer[],
  grading?: Grading,

  nextQuestion(): void,
  previousQuestion(): void,
  setActiveAnswerTab(answerTab: AnswerTabType): void,

  increaseEditorFontSize(): void,
  decreaseEditorFontSize(): void,
  setEditorTheme(theme: string): void,
} & OwnProps

type QuestionContentProps = {
  question: Question,
}

const QuestionContent: React.StatelessComponent<QuestionContentProps> =
  ({ question }) => (
    <div className="question-content" dangerouslySetInnerHTML={{__html: question.value}} />
  )

const Workspace: React.StatelessComponent<Props> =
  (props) => {
    const {
      questions,
      answers,
      workspace,
      nextQuestion,
      previousQuestion,
      setActiveAnswerTab,
      increaseEditorFontSize,
      decreaseEditorFontSize,
      setEditorTheme,
    } = props

    const activeQuestion = questions && workspace && questions.length > 0 &&
      questions[workspace.activeQuestion]

    const activeAnswer = activeQuestion && answers && answers.find(a =>
      a.question === activeQuestion.id)

    const questionsSlider = activeQuestion && (
      <QuestionsSlider
        workspace={workspace}
        questions={questions!}
        handleNextQuestion={nextQuestion}
        handlePreviousQuestion={previousQuestion}
      />
    )

    const questionContent = activeQuestion &&
      <QuestionContent question={activeQuestion} />

    const answerContent = activeQuestion && activeAnswer && (
      <AnswerContent
        answer={activeAnswer}
        question={activeQuestion}
        workspace={workspace}
        handleTabChange={setActiveAnswerTab}
        {...{increaseEditorFontSize, decreaseEditorFontSize, setEditorTheme }}
      />
    )

    let content: React.ReactNode = null

    if (!workspace || !activeQuestion) {
      content = null
    } else if (activeQuestion && !activeQuestion.answerable) {
      content = (
        <div className="row">
          <div className="question-container col-xs-12">
            {questionContent}
          </div>
        </div>
      )
    } else if (workspace.layoutType === LayoutType.SplitHorizontal) {
      content = (
        <div className="row">
          <div className="question-container col-xs-6">
            {questionContent}
          </div>
          <div className="answer-container col-xs">
            {answerContent}
          </div>
        </div>
      )
    } else if (workspace.layoutType === LayoutType.AnswerOnly) {
      content = (
        <div className="row">
          <div className="answer-container col-xs-12">
            {answerContent}
          </div>
        </div>
      )
    } else if (workspace.layoutType === LayoutType.QuestionOnly) {
      content = (
        <div className="row">
          <div className="question-container col-xs-12">
            {questionContent}
          </div>
        </div>
      )
    }

    return (
      <div className="sa-workspace">
        {questionsSlider}
        {content}
      </div>
    )
  }

export default Workspace
