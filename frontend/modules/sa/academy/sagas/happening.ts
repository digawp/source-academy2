import { all, takeEvery, call, put, Effect } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { API, User } from 'sa/core/types'
import { fetchHappeningsSuccess, FETCH_HAPPENINGS } from '../reducers/happening'
import { getAssessment } from '../reducers/assessment'
import { getUser } from 'sa/core/reducers/user'
import api from 'sa/core/api'

function* doFetchAssessments() {
  const effects: Effect[] = []
  const happenings = yield call(api.happenings.fetch)

  for (const happening of happenings) {
    effects.push(put(getUser(happening.user)))
    if (typeof happening.assessment !== 'undefined') {
      effects.push(put(getAssessment(happening.assessment)))
    }
  }
  yield all(effects)
  yield put(fetchHappeningsSuccess(happenings))
}

function* happeningsSaga(): any {
  yield takeEvery(FETCH_HAPPENINGS, doFetchAssessments)
}

export default happeningsSaga
