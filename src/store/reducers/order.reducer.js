import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat({
          id: action.payload.id,
          ...action.payload.data,
        }),
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };


    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    case actionTypes.FETCH_ORDERS_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }

    default:
      return state;
  }
};

export default orderReducer;