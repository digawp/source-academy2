import { takeEvery, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { ACADEMY_BUNDLE_LOADED } from 'sa/core/util'

import { fetchAssessments } from '../reducers/assessment'

function* fetchRequiredResource() {
  const locations = location.pathname.split('/')
  const isInsideJournal =
    locations[1] === 'academy' && locations[2] === 'journal'

  if (isInsideJournal) {
    const tab = locations[3]

    if (tab === 'assessments') {
      yield put(fetchAssessments())
    } else if (tab === 'answers') {
      const answerId = locations[4]
    }
  }
}

function* journalSaga() {
  yield takeEvery([
    ACADEMY_BUNDLE_LOADED,
    LOCATION_CHANGE
  ], fetchRequiredResource)
}

export default journalSaga
