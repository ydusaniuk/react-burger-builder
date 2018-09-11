export const AuthActionTypes = {
  AUTHENTICATE: 'AUTHENTICATE',
  AUTHENTICATE_SUCCESS: 'AUTHENTICATE_SUCCESS',
  AUTHENTICATE_FAIL: 'AUTHENTICATE_FAIL',

  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  TRY_AUTO_LOGIN: 'TRY_AUTO_LOGIN',
  CHECK_AUTH_TIMEOUT: 'CHECK_AUTH_TIMEOUT',
};

const authenticate = (email, password, isSigningUp = false) => {
  return {
    type: AuthActionTypes.AUTHENTICATE,
    payload: {
      email: email,
      password: password,
      isSigningUp: isSigningUp,
    }
  };
};

const authenticateSuccess = (token, userId) => {
  return {
    type: AuthActionTypes.AUTHENTICATE_SUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  }
};

const authenticateFail = (error) => {
  return {
    type: AuthActionTypes.AUTHENTICATE_FAIL,
    payload: error,
  }
};

const logout = () => {
  return {
    type: AuthActionTypes.LOGOUT,
  };
};

const logoutSuccess = () => {
  return {
    type: AuthActionTypes.LOGOUT_SUCCESS,
  }
};

const checkAuthTimeout = (expirationTime) => {
  return {
    type: AuthActionTypes.CHECK_AUTH_TIMEOUT,
    payload: expirationTime,
  }
};

const tryAutoLogin = () => {
  return {
    type: AuthActionTypes.TRY_AUTO_LOGIN
  }
};

const authActions = {
  authenticate,
  authenticateSuccess,
  authenticateFail,
  logout,
  logoutSuccess,
  checkAuthTimeout,
  tryAutoLogin,
};

export default authActions;
