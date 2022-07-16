import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL } from 'utils/constants';

import { FETCH_USERS } from './constants';

import { usersFetched, fetchUsersFailed } from './actions';

import { makeSelectPage } from './selectors';

export function* fetchUsers() {
  const page = yield select(makeSelectPage());
  const requestURL = `${API_URL}?seed=test&page=${page}&results=10`;

  try {
    const users = yield call(request, requestURL);
    yield put(usersFetched(users));
  } catch (err) {
    yield put(fetchUsersFailed(err));
  }
}


// Individual exports for testing
export default function* homeSaga() {
  yield takeLatest(FETCH_USERS, fetchUsers);
}
