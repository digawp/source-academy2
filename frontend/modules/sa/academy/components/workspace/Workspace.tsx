import * as React from 'react'
import { capitalize } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { Slider, Button, IconClasses } from '@blueprintjs/core'
import { Student, Question, Answer, Assessment,
  Grading, WorkspaceState } from 'sa/core/types'

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

const QuestionsSlider: React.StatelessComponent<Props> =
  ({ questions, workspace, nextQuestion, previousQuestion }) => {
    const enablePreviousQuestionButton = workspace.activeQuestion >= 1
    const enableNextQuestionButton = workspace.activeQuestion <= questions!.length - 2
    const nextQuestionButton = (
      <Button
        className="pt-minimal"
        disabled={!enableNextQuestionButton}
        onClick={nextQuestion}
        iconName={IconClasses.CHEVRON_RIGHT}
      />
    )
    const previousQuestionButton = (
      <Button
        disabled={!enablePreviousQuestionButton}
        className="pt-minimal"
        onClick={previousQuestion}
        iconName={IconClasses.CHEVRON_LEFT}
      />
    )
    const activeQuestionTitle = questions![workspace.activeQuestion].title

    return (
      <div className="questions-slider-container">
        <Slider
          className="questions-slider"
          initialValue={1}
          max={questions!.length}
          min={1}
          stepSize={1}
          showTrackFill={true}
          labelPrecision={1}
          renderLabel={false}
          value={workspace.activeQuestion + 1}
        />
        <div className="questions-picker row">
          {previousQuestionButton}
          {nextQuestionButton}
          <div className="current-question-title col-xs-10">
            {activeQuestionTitle}
          </div>
        </div>
      </div>
    )
  }

const QuestionContent: React.StatelessComponent<QuestionContentProps> =
  ({ question }) => (
    <div dangerouslySetInnerHTML={{__html: question.value}} />
  )

const Workspace: React.StatelessComponent<Props> =
  (props) => {
    const { questions, answers, workspace } = props
    const questionsReady = questions && questions.length > 0
    const questionsSlider = questionsReady &&
      <QuestionsSlider {...props} />

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
