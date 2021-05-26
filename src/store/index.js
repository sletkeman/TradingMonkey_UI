import { configureStore } from '@reduxjs/toolkit';
// import persistState from 'redux-localstorage'
import monkey from './monkey/reducer';
import etrade from './etrade/reducer';

export default configureStore({
  reducer: {
    monkey,
    etrade
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {},
  // enhancers: [persistState('etrade', 'TradingMonkey')]
});

