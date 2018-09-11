export const orderActionTypes = {
  PURCHASE_INIT: 'PURCHASE_INIT',

  PURCHASE_BURGER_START: 'PURCHASE_BURGER_START',
  PURCHASE_BURGER_SUCCESS: 'PURCHASE_BURGER_SUCCESS',
  PURCHASE_BURGER_FAIL: 'PURCHASE_BURGER_FAIL',

  FETCH_ORDERS_START: 'FETCH_ORDERS_START',
  FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAIL: 'FETCH_ORDERS_FAIL',
};

export const purchaseInit = () => {
  return {
    type: orderActionTypes.PURCHASE_INIT,
  }
};

export const purchaseBurgerStart = (orderData, token) => {
  return {
    type: orderActionTypes.PURCHASE_BURGER_START,
    payload: {
      orderData,
      token,
    }
  }
};

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: orderActionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      id: id,
      data: orderData,
    },
  }
};

export const purchaseBurgerFail = error => {
  return {
    type: orderActionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  }
};

export const fetchOrdersStart = (token, userId) => {
  return {
    type: orderActionTypes.FETCH_ORDERS_START,
    payload: {
      token,
      userId,
    },
  }
};

export const fetchOrdersSuccess = orders => {
  return {
    type: orderActionTypes.FETCH_ORDERS_SUCCESS,
    payload: orders,
  }
};

export const fetchOrdersFail = error => {
  return {
    type: orderActionTypes.FETCH_ORDERS_FAIL,
    payload: error,
  }
};

export const orderActions = {
  purchaseInit,

  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFail,

  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail,
};

export default orderActions;
