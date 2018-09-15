import { authActionTypes } from '../actions/auth.actions';
import requestStatus from '../../shared/requestStatus';

export const initialState = {
  userId: null,
  error: null,
  loading: false,
  requestOobCode: null,
  requestOobCodeLoadStatus: requestStatus(),
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
        userId: null,
      };

    case authActionTypes.FORGOT_PASSWORD:
      return {
        ...state,
        requestOobCode: null,
        requestOobCodeLoadStatus: requestStatus(),
      };

    case authActionTypes.REQUEST_OOB_CODE:
      return {
        ...state,
        requestOobCode: { email: action.payload },
        requestOobCodeLoadStatus: requestStatus(true),
      };

    case authActionTypes.REQUEST_OOB_CODE_SUCCESS:
      return {
        ...state,
        requestObbCode: null,
        requestOobCodeLoadStatus: requestStatus(false, true),
      };

    case authActionTypes.REQUEST_OOB_CODE_FAIL:
      return {
        ...state,
        requestObbCode: null,
        requestOobCodeLoadStatus: requestStatus(false, false, action.payload),
      };

    default:
      return state;
  }
};

export default authReducer;
