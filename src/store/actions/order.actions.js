import * as actionTypes from './actionTypes';
import { axiosOrders } from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      id: id,
      data: orderData,
    },
  }
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  }
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axiosOrders
      .post('/orders.json?auth=' + token, orderData)
      .then(res => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
      .catch(err => dispatch(purchaseBurgerFail(err)))
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: orders,
  }
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    payload: error,
  }
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
};

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axiosOrders.get('/orders.json?auth=' + token)
      .then(res => {
        const fetchedOrders = [];

        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }

        dispatch(fetchOrdersSuccess(fetchedOrders));
      }).catch(err => dispatch(fetchOrdersFail(err)));
  };
};
