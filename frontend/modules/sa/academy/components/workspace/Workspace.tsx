import * as React from 'react'
import { capitalize } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { Slider, Button, IconClasses } from '@blueprintjs/core'
import { Student, Question, Answer, Assessment,
  Grading, WorkspaceState, LayoutType } from 'sa/core/types'

import QuestionsSlider from './QuestionsSlider'

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
    const { questions, answers, workspace, nextQuestion, previousQuestion } = props

    const questionsReady = questions && workspace && questions.length > 0 &&
      questions[workspace.activeQuestion]

    const questionsSlider = questionsReady && (
      <QuestionsSlider
        workspace={workspace}
        questions={questions!}
        handleNextQuestion={nextQuestion}
        handlePreviousQuestion={previousQuestion}
      />
    )

    const questionContent = questionsReady &&
      <QuestionContent question={questions![workspace.activeQuestion]} />

    let content: React.ReactNode = null

    if (!workspace) {
      content = null
    } else if (workspace.layoutType === LayoutType.SplitHorizontal) {
      content = (
        <div className="row">
          <div className="question-container col-xs-6">
            {questionContent}
          </div>
          <div className="answer-container col-xs" />
        </div>
      )
    } else if (workspace.layoutType === LayoutType.AnswerOnly) {
      content = (
        <div className="row">
          <div className="answer-container col-xs-12" />
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
