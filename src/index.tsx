import React from 'react';
import ReactDOM from 'react-dom';

// Add Redux
import { Provider } from 'react-redux';

import './index.css';
import { App } from "./components/app/app";
import reportWebVitals from './reportWebVitals';

// Add Redux store
import { store } from './services/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
