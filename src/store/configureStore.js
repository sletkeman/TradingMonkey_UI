import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import indexReducer from './reducer';

const configureStore = (initialState = {}) => {
  const composedEnhancer = compose(applyMiddleware(thunkMiddleware));
  return createStore(indexReducer, initialState, composedEnhancer);
};

export default configureStore;
