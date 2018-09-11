export const burgerBuilderActionTypes = {
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  REMOVE_INGREDIENT: 'REMOVE_INGREDIENT',

  SET_INGREDIENTS: 'SET_INGREDIENTS',
  SET_INGREDIENTS_SUCCESS: 'SET_INGREDIENTS_SUCCESS',
  SET_INGREDIENTS_FAIL: 'SET_INGREDIENTS_FAIL',

};

export const addIngredient = (name) => {
  return {
    type: burgerBuilderActionTypes.ADD_INGREDIENT,
    payload: name,
  }
};

export const removeIngredient = (name) => {
  return {
    type: burgerBuilderActionTypes.REMOVE_INGREDIENT,
    payload: name,
  }
};

export const setIngredients = () => {
  return {
    type: burgerBuilderActionTypes.SET_INGREDIENTS,
  };
};

const setIngredientsSuccess = (ingredients) => {
  return {
    type: burgerBuilderActionTypes.SET_INGREDIENTS_SUCCESS,
    payload: ingredients,
  }
};

export const setIngredientsFail = (error) => {
  return {
    type: burgerBuilderActionTypes.SET_INGREDIENTS_FAIL,
    payload: error,
  };
};

export const burgerBuilderActions = {
  addIngredient,
  removeIngredient,
  setIngredients,
  setIngredientsSuccess,
  setIngredientsFail,
};

export default burgerBuilderActions;
