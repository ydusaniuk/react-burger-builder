import { takeEvery } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import {
  burgerBuilderActions,
  burgerBuilderActionTypes,
} from '../actions/burgerBuilder.actions';
import { axiosOrders } from '../../axios-orders';

export function* burgerBuilderSagas() {
  yield takeEvery(burgerBuilderActionTypes.SET_INGREDIENTS, setIngredientsSaga)
}

function* setIngredientsSaga() {
  try {
    const response = yield axiosOrders.get('/ingredients.json');
    yield put(burgerBuilderActions.setIngredientsSuccess(response.data));
  } catch(error) {
    yield put(burgerBuilderActions.setIngredientsFail(error));
  }
}
