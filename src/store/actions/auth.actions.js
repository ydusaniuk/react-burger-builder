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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('localId');

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
        const expireDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);

        localStorage.setItem('expirationDate', expireDate.toISOString());
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('localId', res.data.localId);

        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      })

  }
};

export const checkAuthState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(logout());
        return;
      }

      const localId = localStorage.getItem('localId');
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {
        dispatch(logout());
        return;
      }

      dispatch(authSuccess(token, localId));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
  }
};
