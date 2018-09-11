import { orderActionTypes } from '../actions/order.actions';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderActionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };

    case orderActionTypes.PURCHASE_BURGER:
      return {
        ...state,
        loading: true,
      };

    case orderActionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat({
          id: action.payload.id,
          ...action.payload.data,
        }),
      };

    case orderActionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };

    case orderActionTypes.FETCH_ORDERS:
      return {
        ...state,
        loading: true,
      };

    case orderActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    case orderActionTypes.FETCH_ORDERS_FAIL: {
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
