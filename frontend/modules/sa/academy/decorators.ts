import * as React from 'react'
import { connect, Dispatch, MapDispatchToPropsFunction } from 'react-redux'
import { push } from 'react-router-redux'
import { Student } from 'sa/core/types'
import { State } from './types'

export type BaseProps = {
}

export type ViewAssessmentProps = {
  viewAssessment: (assessment: number, student?: number) => void,
}

export type CurrentStudentProps = {
  student: Student,
}

export function withViewAssessment<P extends ViewAssessmentProps>(
  WrappedComponent: React.StatelessComponent<P> | React.ComponentClass<P>,
) {
  const mapDispatchToProps: MapDispatchToPropsFunction<ViewAssessmentProps, P> =
    (dispatch: Dispatch<State>, ownProps: P) => ({
      viewAssessment(assessment: number, student?: number) {
        let url = `/academy/journal/workspaces/${assessment}`
        if (student) {
          url += `?student=${student}`
        }
        dispatch(push(url))
      },
    })
  return connect(null, mapDispatchToProps)(WrappedComponent)
}

export function withStudent<P extends CurrentStudentProps>(
  WrappedComponent: React.StatelessComponent<P> | React.ComponentClass<P>,
) {
  const mapStateToProps =
    (state: State, ownProps: P) => ({
      student: state.currentStudent,
    })
  return connect(mapStateToProps)(WrappedComponent)
}
