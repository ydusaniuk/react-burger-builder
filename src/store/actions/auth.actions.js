export const authActionTypes = {
  AUTHENTICATE: 'AUTHENTICATE',
  AUTHENTICATE_SUCCESS: 'AUTHENTICATE_SUCCESS',
  AUTHENTICATE_FAIL: 'AUTHENTICATE_FAIL',

  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  TRY_AUTO_LOGIN: 'TRY_AUTO_LOGIN',
  CHECK_AUTH_TIMEOUT: 'CHECK_AUTH_TIMEOUT',

  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  REQUEST_OOB_CODE: 'REQUEST_OOB_CODE',
  REQUEST_OOB_CODE_SUCCESS: 'REQUEST_OOB_CODE_SUCCESS',
  REQUEST_OOB_CODE_FAIL: 'REQUEST_OOB_CODE_FAIL',
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

// REQUEST_OOB_CODE
const forgotPassword = () => {
  return {
    type: authActionTypes.FORGOT_PASSWORD,
  }
};

const requestObbCode = (email) => {
  return {
    type: authActionTypes.REQUEST_OOB_CODE,
    payload: email,
  }
};

const requestObbCodeSuccess = () => {
  return {
    type: authActionTypes.REQUEST_OOB_CODE_SUCCESS,
  }
};

const requestObbCodeFail = (error) => {
  return {
    type: authActionTypes.REQUEST_OOB_CODE_FAIL,
    payload: error,
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

  forgotPassword,
  requestObbCode,
  requestObbCodeSuccess,
  requestObbCodeFail,
};

export default authActions;
