import { select, takeEvery, call, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, IUser } from 'sa/core/types'
import { ACADEMY_BUNDLE_LOADED } from 'sa/core/util'
import {
  fetchAssessments,
} from '../ducks/assessment'

declare const CURRENT_API: API

function* fetchRequiredResource() {
  const locations = location.pathname.split('/')

  if (locations[1] === 'academy' || locations[2] === 'inbox') {
    const params = new URLSearchParams(location.search)
    const activeTab = params.get('topic') || 'soon'
    if (activeTab === 'soon') {
      yield put(fetchAssessments())
    }
  }
}

function* inboxSaga(): any {
  yield takeEvery([
    ACADEMY_BUNDLE_LOADED,
    LOCATION_CHANGE
  ], fetchRequiredResource)
}

export default inboxSaga