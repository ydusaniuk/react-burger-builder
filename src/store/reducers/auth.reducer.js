import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };

    default:
      return state;
  }
};

export default authReducer;
