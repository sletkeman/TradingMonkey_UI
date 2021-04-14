import { combineReducers } from 'redux';

import etrade from './etrade/reducer';
import monkey from './monkey/reducer';

const rootReducer = combineReducers({
  etrade,
  monkey
});

export default rootReducer;
