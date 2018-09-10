import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 0.4,
  meat: 1.3,
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
        totalPrice: 4,
        error: false,
      };

    case actionTypes.SET_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default burgerBuilderReducer;
