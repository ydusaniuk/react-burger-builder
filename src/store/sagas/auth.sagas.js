import { delay } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import axios from 'axios';

import authActions, { authActionTypes } from '../actions/auth.actions';

export function* authSagas() {
  yield takeEvery(authActionTypes.AUTHENTICATE, authenticateSaga);
  yield takeEvery(authActionTypes.LOGOUT, logoutSaga);
  yield takeEvery(authActionTypes.TRY_AUTO_LOGIN, tryAutoLoginSaga);
  yield takeEvery(authActionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
}

function* authenticateSaga(action) {
  const url = action.payload.isSigningUp
    ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDdoYHA81uEQhxNcFQZAWe-LN0M3Ry7XnY'
    : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDdoYHA81uEQhxNcFQZAWe-LN0M3Ry7XnY';

  try {
    const response = yield axios.post(url, {
      email: action.payload.email,
      password: action.payload.password,
      returnSecureToken: true,
    });

    const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

    localStorage.setItem('expirationDate', expireDate.toISOString());
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('localId', response.data.localId);

    yield put(authActions.authenticateSuccess(response.data.idToken, response.data.localId));
    yield put(authActions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(authActions.authenticateFail(error.response.data.error));
  }
}

function* logoutSaga() {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('localId');

  yield put(authActions.logoutSuccess());
}

function* tryAutoLoginSaga() {
  const token = localStorage.getItem('token');

  if (!token) {
    yield put(authActions.logout());
    return;
  }

  const localId = localStorage.getItem('localId');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));

  if (expirationDate <= new Date()) {
    yield put(authActions.logout());
    return;
  }

  yield put(authActions.authenticateSuccess(token, localId));
  yield put(authActions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
}

function* checkAuthTimeoutSaga(action) {
  yield delay(action.payload * 1000);
  yield put(authActions.logout());
}
