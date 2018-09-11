import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import authReducer from './store/reducers/auth.reducer';
import orderReducer from './store/reducers/order.reducer';
import burgerBuilderReducer from './store/reducers/burgerBuilder.reducer';

import { authSagas } from './store/sagas/auth.sagas';
import { burgerBuilderSagas } from './store/sagas/burgerBuilder.sagas';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware),
  )
);

sagaMiddleware.run(authSagas);
sagaMiddleware.run(burgerBuilderSagas);

export default store;
