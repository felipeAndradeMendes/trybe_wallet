import { USER_EMAIL } from './actionTypes';

export const getEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});
