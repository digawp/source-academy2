import { takeEvery, call, put } from 'redux-saga/effects'
import { push, LOCATION_CHANGE } from 'react-router-redux'
import { API } from '../types'
import { isProtectedPath } from '../util'
import { authenticateSuccess, AUTHENTICATE } from '../reducers/auth'

declare const CURRENT_API: API

function* checkAuth(action: any): any {
  const { pathname } = action.payload
  if (isProtectedPath(pathname)) {
    const result = yield call(CURRENT_API.auth.refresh)
    yield put(authenticateSuccess(result, result.token))
  }
}

function* authenticate(action: any): any {
  const { username, password } = action.payload
  const result = yield call(CURRENT_API.auth.authenticate, username, password)
  yield put(authenticateSuccess(result, result.token))
  yield put(push('academy'))
}

function* deauthenticate(action: any): any {
  const result = yield call(CURRENT_API.auth.deauthenticate)
  yield put(push('/'))
}

function* authSaga(): any {
  // Check auth every location change
  yield takeEvery(LOCATION_CHANGE, checkAuth)

  // Authenticate if requested
  yield takeEvery(AUTHENTICATE, authenticate)

  // Deauthenticate if requested
  yield takeEvery(AUTHENTICATE, authenticate)
}

export default authSaga