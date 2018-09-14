import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import appReducer from './store/reducers/app.reducer';
import authReducer from './store/reducers/auth.reducer';
import orderReducer from './store/reducers/order.reducer';
import burgerBuilderReducer from './store/reducers/burgerBuilder.reducer';

import { authSagas } from './store/sagas/auth.sagas';
import { burgerBuilderSagas } from './store/sagas/burgerBuilder.sagas';
import { orderSagas } from './store/sagas/order.sagas';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null || compose;

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  order: orderReducer,
  burgerBuilder: burgerBuilderReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
  )
);

sagaMiddleware.run(authSagas);
sagaMiddleware.run(burgerBuilderSagas);
sagaMiddleware.run(orderSagas);

export default store;
