import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL } from 'utils/constants';

import { FETCH_USERS, SET_GENDER } from './constants';

import { usersFetched, fetchUsersFailed } from './actions';

import { makeSelectGender } from './selectors';

export function* fetchUsers() {
  const gender = yield select(makeSelectGender());
  let requestURL = `${API_URL}?results=50`;

  if (gender) {
    requestURL += `&gender=${gender}`;
  }

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
  yield takeLatest(SET_GENDER, fetchUsers);
}
