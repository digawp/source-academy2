import { select, takeEvery, call, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, IUser, IAnnouncement } from 'sa/core/types'
import {
  fetchAnnouncementsSuccess,
  FETCH_ANNOUNCEMENTS,
  FETCH_ANNOUNCEMENTS_SUCCESS
} from '../reducers/announcement'
import { getUser } from 'sa/core/reducers/user'

declare const CURRENT_API: API

function* doFetchAnnouncements() {
  const announcements: IAnnouncement[] = yield call(CURRENT_API.announcement.fetch)
  for (let announcement of announcements) {
    yield put(getUser(announcement.poster))
  }
  yield put(fetchAnnouncementsSuccess(announcements))
}

function* announcementSaga(): any {
  yield takeEvery(FETCH_ANNOUNCEMENTS, doFetchAnnouncements)
}

export default announcementSaga