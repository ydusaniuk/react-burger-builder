import { authActionTypes } from '../actions/auth.actions';

export const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.AUTHENTICATE:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case authActionTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false,
      };

    case authActionTypes.AUTHENTICATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case authActionTypes.LOGOUT_SUCCESS:
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
