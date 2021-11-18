import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Store } from './application/store';
import App from './views/App';

ReactDOM.render(
  <Provider store={Store}>
      <App /> 
  </Provider>,
  document.getElementById('root')
);
