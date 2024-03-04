// src/reducers/rootReducer.ts
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Make sure RootState is exported
export default rootReducer;
