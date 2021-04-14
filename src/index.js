import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.render(
  <React.StrictMode>
    <Provider >
      <App store={store} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
