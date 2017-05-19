import { takeEvery, call, put, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, User } from 'sa/core/types'
import { ACADEMY_BUNDLE_LOADED } from 'sa/core/util'

import { fetchAssessments } from '../reducers/assessment'
import { fetchAnnouncements } from '../reducers/announcement'
import { fetchHappenings } from '../reducers/happening'
import { State } from '../types'

function* fetchRequiredResource() {
  const { location } = yield select((state: State) => state.routing)
  const paths = location.pathname.split('/')
  const isInsideInbox =
    paths[1] === 'academy' && paths[2] === 'inbox'

  if (isInsideInbox) {
    const tab = paths[3]

    if (tab === 'soon') {
      yield put(fetchAssessments())
    } else if (tab === 'announcements') {
      yield put(fetchAnnouncements())
    } else if (tab === 'happenings') {
      yield put(fetchHappenings())
    }
  }
}

function* inboxSaga() {
  yield takeEvery([
    ACADEMY_BUNDLE_LOADED,
    LOCATION_CHANGE,
  ], fetchRequiredResource)
}

export default inboxSaga
