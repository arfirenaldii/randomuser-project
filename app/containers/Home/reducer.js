/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import {
  FETCH_USERS,
  USERS_FETCHED,
  FETCH_USERS_FAILED,
  SET_GENDER,
} from './constants';

export const initialState = {
  users: [],
  gender: 'all',
  page: 1,
  loadingFetchUsers: false,
  errorFetchUsers: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_USERS:
        draft.loadingFetchUsers = true;
        break;

      case USERS_FETCHED:
        draft.loadingFetchUsers = false;
        draft.users = action.users;
        break;

      case FETCH_USERS_FAILED:
        draft.loadingFetchUsers = false;
        draft.errorFetchUsers = action.error;
        break;

      case SET_GENDER:
        draft.gender = action.gender;
        draft.loadingFetchUsers = true;
        break;
    }
  });

export default homeReducer;
