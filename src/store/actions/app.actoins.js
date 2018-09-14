export const appActionTypes = {
  SHOW_SHADOW_SPINNER: 'SHOW_SHADOW_SPINNER',
  HIDE_SHADOW_SPINNER: 'HIDE_SHADOW_SPINNER',
};

const showShadowSpinner = () => {
  return {
    type: appActionTypes.SHOW_SHADOW_SPINNER,
  }
};

const hideShadowSpinner = () => {
  return {
    type: appActionTypes.HIDE_SHADOW_SPINNER,
  }
};

export const appActions = {
  showShadowSpinner,
  hideShadowSpinner,
};

export default appActions;
