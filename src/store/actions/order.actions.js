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

export const purchaseBurger = orderData => {
  return dispatch => {
    purchaseBurgerStart();
    axiosOrders
      .post('/orders.json', orderData)
      .then(res => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
      .catch(err => dispatch(purchaseBurgerFail(err)))
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
};
