import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { authSagas } from './store/sagas/auth.sagas';

import burgerBuilderReducer from './store/reducers/burgerBuilder.reducer';
import orderReducer from './store/reducers/order.reducer';
import authReducer from './store/reducers/auth.reducer';


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

export default store;
