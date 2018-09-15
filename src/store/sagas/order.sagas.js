import { put } from 'redux-saga/effects';
import { takeEvery, all } from 'redux-saga/effects';

import {
  orderActionTypes,
  orderActions,
} from '../actions/order.actions';
import appActions from '../actions/app.actoins';

import { axiosOrders } from '../../axios-orders';

export function* orderSagas() {
  yield all([
    takeEvery(orderActionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    takeEvery(orderActionTypes.FETCH_ORDERS, fetchOrdersSaga),
  ]);
}

function* purchaseBurgerSaga(action) {
  try {
    yield put(appActions.showShadowSpinner());

    const token = yield localStorage.getItem('token');

    const res = yield axiosOrders.post('/orders.json?auth=' + token, action.payload.orderData);
    yield put(orderActions.purchaseBurgerSuccess(res.data.name, action.payload.orderData));
  } catch (error) {
    yield put(orderActions.purchaseBurgerFail(error))
  } finally {
    yield put(appActions.hideShadowSpinner());
  }
}

function* fetchOrdersSaga() {
  try {
    yield put(appActions.showShadowSpinner());

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('localId');

    const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    const res = yield axiosOrders.get('/orders.json?' + queryParams);

    const fetchedOrders = [];

    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key,
      });
    }

    yield put(orderActions.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    yield put(orderActions.fetchOrdersFail(err))
  } finally {
    yield put(appActions.hideShadowSpinner());
  }
}
