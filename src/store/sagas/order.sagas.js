import { takeEvery } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import {
  orderActionTypes,
  orderActions,
} from '../actions/order.actions';
import { axiosOrders } from '../../axios-orders';

export function* orderSagas() {
  yield takeEvery(orderActionTypes.PURCHASE_BURGER_START, purchaseBurgerSaga);
  yield takeEvery(orderActionTypes.FETCH_ORDERS_START, fetchOrdersSaga);
}

function* purchaseBurgerSaga(action) {
  try {
    const res = yield axiosOrders.post('/orders.json?auth=' + action.payload.token, action.payload.orderData);
    yield put(orderActions.purchaseBurgerSuccess(res.data.name, action.payload.orderData));
  } catch (error) {
    yield put(orderActions.purchaseBurgerFail(error))
  }
}

function* fetchOrdersSaga(action) {
  try {
    const queryParams = `auth=${action.payload.token}&orderBy="userId"&equalTo="${action.payload.userId}"`;
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
  }
}
