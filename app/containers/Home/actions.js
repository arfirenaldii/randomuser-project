/*
 *
 * Home actions
 *
 */

import {
  FETCH_USERS,
  USERS_FETCHED,
  FETCH_USERS_FAILED,
  SET_GENDER,
} from './constants';

export function fetchUsers() {
  return {
    type: FETCH_USERS,
  };
}

export function usersFetched(users) {
  return {
    type: USERS_FETCHED,
    users
  };
}

export function fetchUsersFailed(error) {
  return {
    type: FETCH_USERS_FAILED,
    error
  };
}

export function setGender(gender) {
  return {
    type: SET_GENDER,
    gender
  };
}
