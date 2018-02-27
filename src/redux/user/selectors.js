import { createSelector } from 'reselect';

const selectUser = (state) => state.get('user');

const makeSelectToken = () => createSelector(
  selectUser,
  (user) => user.token,
);

export {
  makeSelectToken
};