// src/App.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './reducers/rootReducer';
import { login, logout } from './actions/authActions';
import SignInPage from './pages/auth/login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  // const handleLogin = () => {
  //   dispatch(login());
  // };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome User</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {/* <h1>Please Login</h1> */}
          {/* <button onClick={handleLogin}>Login</button> */}
          <SignInPage />
        </div>
      )}
    </div>
  );
};

export default App;
