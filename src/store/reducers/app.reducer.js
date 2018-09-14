import { appActionTypes } from '../actions/app.actoins';

export const appInitialState = {
  showShadowSpinner: false,
};

const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case appActionTypes.SHOW_SHADOW_SPINNER:
      return {
        ...state,
        showShadowSpinner: true,
      };

    case appActionTypes.HIDE_SHADOW_SPINNER:
      return {
        ...state,
        showShadowSpinner: false,
      };

    default:
      return state;
  }
};

export default appReducer;
