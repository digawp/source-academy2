import { select, takeEvery, call, put } from 'redux-saga/effects'

import { API, IUser } from '../types'
import { getUserSuccess, GET_USER, } from '../reducers/user'

declare const CURRENT_API: API

function* doGetUser(action: any) {
  const user = yield call(CURRENT_API.users.get, action.payload.id)
  yield put(getUserSuccess(user))
}

function* userSaga(): any {
  yield takeEvery(GET_USER, doGetUser)
}

export default userSaga