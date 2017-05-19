import { select, takeEvery, call, put } from 'redux-saga/effects'

import { API, User } from '../types'
import { getUserSuccess, GET_USER } from '../reducers/user'
import api from 'sa/core/api'

function* doGetUser(action: any) {
  const user = yield call(api.users.get, action.payload.id)
  yield put(getUserSuccess(user))
}

function* userSaga(): any {
  yield takeEvery(GET_USER, doGetUser)
}

export default userSaga
