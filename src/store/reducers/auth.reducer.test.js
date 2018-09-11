import authReducer, { initialState } from './auth.reducer';
import * as actionTypes from '../actions/actionTypes';

describe('authReducer', () => {
  let state;

  beforeEach(() => {
    state = {...initialState};
  });

  it('should handle AUTH_START', () => {
    const action = {type: actionTypes.AUTH_START};

    expect(authReducer(state, action)).toEqual({
      ...initialState,
      loading: true,
    })
  });

  it('should return initial state ', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });
});
