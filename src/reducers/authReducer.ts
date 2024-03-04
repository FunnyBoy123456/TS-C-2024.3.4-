// reducers.ts
import { combineReducers } from 'redux';
import { LOGIN, LOGOUT } from '../actions/actionTypes';

export interface AuthState {
  isLoggedIn: boolean;
  userName: String;
}

const initialAuthState: AuthState = {
  isLoggedIn: false,
  userName: "",
};

const authReducer = (state = initialAuthState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userName: action.userName,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userName: '',
      };
    default:
      return state;
  }
};


export default authReducer;
