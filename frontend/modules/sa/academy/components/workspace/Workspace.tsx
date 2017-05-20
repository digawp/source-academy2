import * as React from 'react'
import { capitalize } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { Slider, Button, IconClasses } from '@blueprintjs/core'
import { Student, Question, Answer, Assessment,
  Grading, WorkspaceState } from 'sa/core/types'

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
    <div dangerouslySetInnerHTML={{__html: question.value}} />
  )

const Workspace: React.StatelessComponent<Props> =
  (props) => {
    const { questions, answers, workspace, nextQuestion, previousQuestion } = props
    const questionsReady = questions && questions.length > 0
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

    return (
      <div className="sa-workspace">
        {questionsSlider}
        <div className="row">
          <div className="question-container col-xs-6">
            {questionContent}
          </div>
          <div className="answer-container col-xs" />
        </div>
      </div>
    )
  }

export default Workspace
