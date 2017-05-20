import { connect, Dispatch, MapDispatchToPropsObject } from 'react-redux'
import { State } from '../../types'
import { Answer, Question } from 'sa/core/types'
import Workspace, { OwnProps } from '../../components/workspace/Workspace'
import { withStudent } from '../../decorators'
import {
  nextQuestion,
  previousQuestion,
  setActiveAnswerTab,
  setEditorTheme,
  increaseEditorFontSize,
  decreaseEditorFontSize,
} from '../../reducers/currentWorkspace'
import {
  setAnswerValue,
} from '../../reducers/answer'

import {
  selectAssessment,
  selectQuestions,
  selectGrading,
  selectAnswers,
} from '../../selectors'

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const { location } = state.routing
  const paths = location!.pathname.split('/')
  const isJournal = paths[2] === 'journal'

  if (isJournal) {
    const id = parseInt(paths[paths.length - 1], 10)
    const assessment = selectAssessment(id)(state)
    const questions = selectQuestions(id)(state)
    const grading = selectGrading(id)(state)
    const answers = selectAnswers(questions)(state)

    return {
      ...ownProps,
      assessment,
      answers,
      questions,
      workspace: state.currentWorkspace,
      grading: grading!,
    }
  } else {
    return ownProps
  }
}

const mapDispatchToProps: MapDispatchToPropsObject = {
  nextQuestion,
  previousQuestion,
  setActiveAnswerTab,
  setEditorTheme,
  increaseEditorFontSize,
  decreaseEditorFontSize,
  setAnswerValue,
}

export default connect(mapStateToProps,
  mapDispatchToProps)(withStudent(Workspace))
