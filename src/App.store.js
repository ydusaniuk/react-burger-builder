import { createStore } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder.reducer';

const store = createStore(
  burgerBuilderReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
