import * as actionTypes from './actionTypes';
import axios from 'axios';

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
};


export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  }
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: err,
  }
};

export const auth = (email, password, isSigningUp = false) => {
  return dispatch => {
    dispatch(authStart());

    const url = isSigningUp
      ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDdoYHA81uEQhxNcFQZAWe-LN0M3Ry7XnY'
      : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDdoYHA81uEQhxNcFQZAWe-LN0M3Ry7XnY';

    axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      })

  }
};
