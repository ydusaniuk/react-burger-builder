import { takeEvery } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import {
  burgerBuilderActions,
  burgerBuilderActionTypes,
} from '../actions/burgerBuilder.actions';
import appActions from '../actions/app.actoins';

import { axiosOrders } from '../../axios-orders';

export function* burgerBuilderSagas() {
  yield takeEvery(burgerBuilderActionTypes.SET_INGREDIENTS, setIngredientsSaga)
}

function* setIngredientsSaga() {
  yield put(appActions.showShadowSpinner());

  try {
    const response = yield axiosOrders.get('/ingredients.json');
    yield put(burgerBuilderActions.setIngredientsSuccess(response.data));
  } catch(error) {
    yield put(burgerBuilderActions.setIngredientsFail(error));
  } finally {
    yield put(appActions.hideShadowSpinner());
  }
}
