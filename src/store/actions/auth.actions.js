export const authActionTypes = {
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
    type: authActionTypes.AUTHENTICATE,
    payload: {
      email: email,
      password: password,
      isSigningUp: isSigningUp,
    }
  };
};

const authenticateSuccess = (token, userId) => {
  return {
    type: authActionTypes.AUTHENTICATE_SUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  }
};

const authenticateFail = (error) => {
  return {
    type: authActionTypes.AUTHENTICATE_FAIL,
    payload: error,
  }
};

const logout = () => {
  return {
    type: authActionTypes.LOGOUT,
  };
};

const logoutSuccess = () => {
  return {
    type: authActionTypes.LOGOUT_SUCCESS,
  }
};

const checkAuthTimeout = (expirationTime) => {
  return {
    type: authActionTypes.CHECK_AUTH_TIMEOUT,
    payload: expirationTime,
  }
};

const tryAutoLogin = () => {
  return {
    type: authActionTypes.TRY_AUTO_LOGIN
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
