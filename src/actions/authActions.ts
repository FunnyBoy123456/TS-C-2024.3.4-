// src/actions/authActions.ts
import { LOGIN, LOGOUT } from './actionTypes';

export const login = (userName : String) => ({
  type: LOGIN as typeof LOGIN,
  userName: userName,
});

export const logout = () => ({
  type: LOGOUT as typeof LOGOUT,
});
