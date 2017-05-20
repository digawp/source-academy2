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
} & OwnProps

type QuestionsSliderProps = {
  questions: Question[],
  workspace: WorkspaceState,
}

type QuestionContentProps = {
  question: Question,
}

const QuestionsSlider: React.StatelessComponent<QuestionsSliderProps> =
  ({ questions, workspace }) => {
    return (
      <div className="questions-slider-container">
        <Slider
          className="questions-slider"
          initialValue={1}
          max={questions.length}
          min={1}
          stepSize={1}
          showTrackFill={true}
          labelPrecision={1}
          renderLabel={false}
          value={workspace.activeQuestion + 1}
        />
        <div className="questions-picker row">
          <Button className="pt-minimal" iconName={IconClasses.CHEVRON_LEFT} />
          <Button className="pt-minimal" iconName={IconClasses.CHEVRON_RIGHT} />
          <div className="current-question-title col-xs-10">
            {questions[workspace.activeQuestion].title}
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
  ({ questions, answers, workspace }) => {
    const questionsReady = questions && questions.length > 0
    const questionsSlider = questionsReady &&
      <QuestionsSlider questions={questions!} workspace={workspace} />

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
