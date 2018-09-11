import authReducer, { initialState } from './auth.reducer';
import { authActionTypes } from '../actions/auth.actions';

describe('authReducer', () => {
  let state;

  beforeEach(() => {
    state = {...initialState};
  });

  it('should handle AUTHENTICATE', () => {
    const action = {type: authActionTypes.AUTHENTICATE};

    expect(authReducer(state, action)).toEqual({
      ...initialState,
      loading: true,
    })
  });

  it('should return initial state ', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });
});
