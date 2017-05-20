import * as React from 'react'
import { Button, IconClasses, Slider } from '@blueprintjs/core'
import { WorkspaceState, Question } from 'sa/core/types'

export type Props = {
  questions: Question[],
  workspace: WorkspaceState

  handleNextQuestion(): void,
  handlePreviousQuestion(): void,
}

const QuestionsSlider: React.StatelessComponent<Props> =
  ({ questions, workspace, handleNextQuestion, handlePreviousQuestion }) => {
    const enablePreviousQuestionButton = workspace.activeQuestion >= 1
    const enableNextQuestionButton = workspace.activeQuestion <= questions!.length - 2
    const nextQuestionButton = (
      <Button
        className="pt-minimal"
        disabled={!enableNextQuestionButton}
        onClick={handleNextQuestion}
        iconName={IconClasses.CHEVRON_RIGHT}
      />
    )
    const previousQuestionButton = (
      <Button
        disabled={!enablePreviousQuestionButton}
        className="pt-minimal"
        onClick={handlePreviousQuestion}
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

export default QuestionsSlider
