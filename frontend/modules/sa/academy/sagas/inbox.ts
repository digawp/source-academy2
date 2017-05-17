import { takeEvery, call, put, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, IUser } from 'sa/core/types'
import { ACADEMY_BUNDLE_LOADED } from 'sa/core/util'

import { fetchAssessments } from '../reducers/assessment'
import { fetchAnnouncements } from '../reducers/announcement'
import { fetchHappenings } from '../reducers/happening'

function* fetchRequiredResource() {
  const locations = location.pathname.split('/')
  const isInsideInbox =
    locations[1] === 'academy' && locations[2] === 'inbox'

  if (isInsideInbox) {
    const tab = locations[3]

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
    LOCATION_CHANGE
  ], fetchRequiredResource)
}

export default inboxSaga
