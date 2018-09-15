export const orderActionTypes = {
  PURCHASE_INIT: 'PURCHASE_INIT',

  PURCHASE_BURGER: 'PURCHASE_BURGER',
  PURCHASE_BURGER_SUCCESS: 'PURCHASE_BURGER_SUCCESS',
  PURCHASE_BURGER_FAIL: 'PURCHASE_BURGER_FAIL',

  FETCH_ORDERS: 'FETCH_ORDERS',
  FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAIL: 'FETCH_ORDERS_FAIL',
};

const purchaseInit = () => {
  return {
    type: orderActionTypes.PURCHASE_INIT,
  }
};

const purchaseBurger = (orderData, token) => {
  return {
    type: orderActionTypes.PURCHASE_BURGER,
    payload: {
      orderData,
      token,
    }
  }
};

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: orderActionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      id: id,
      data: orderData,
    },
  }
};

const purchaseBurgerFail = error => {
  return {
    type: orderActionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  }
};

const fetchOrders = () => {
  return {
    type: orderActionTypes.FETCH_ORDERS,
  }
};

const fetchOrdersSuccess = orders => {
  return {
    type: orderActionTypes.FETCH_ORDERS_SUCCESS,
    payload: orders,
  }
};

const fetchOrdersFail = error => {
  return {
    type: orderActionTypes.FETCH_ORDERS_FAIL,
    payload: error,
  }
};

export const orderActions = {
  purchaseInit,

  purchaseBurger,
  purchaseBurgerSuccess,
  purchaseBurgerFail,

  fetchOrders,
  fetchOrdersSuccess,
  fetchOrdersFail,
};

export default orderActions;
