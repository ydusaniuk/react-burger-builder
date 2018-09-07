import * as actionTypes from './actionTypes';
import { axiosOrders } from '../../axios-orders';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: name,
  }
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: name,
  }
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: ingredients,
  };
};

export const setIngredientsFail = () => {
  return {
    type: actionTypes.SET_INGREDIENTS_FAIL,
  };
};

export const initIngredients = () => {
  return dispatch => {
    axiosOrders.get('/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data));
      }).catch(() => {
        dispatch(setIngredientsFail())
    });
  }
};
