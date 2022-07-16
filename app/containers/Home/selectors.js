import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectHomeDomain = state => state.home || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectHome = () =>
  createSelector(
    selectHomeDomain,
    substate => substate,
  );

const makeSelectPage = () =>
  createSelector(
    selectHomeDomain,
    state => state.page,
  );

const makeSelectGender = () =>
  createSelector(
    selectHomeDomain,
    state => state.gender,
  );

export default makeSelectHome;
export {
  selectHomeDomain,
  makeSelectPage,
  makeSelectGender,
};
