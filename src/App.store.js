import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import burgerBuilderReducer from './store/reducers/burgerBuilder.reducer';
import orderReducer from './store/reducers/order.reducer';
import authReducer from './store/reducers/auth.reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

export default store;
