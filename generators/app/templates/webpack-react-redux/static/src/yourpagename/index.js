import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/index.js'
import App from './app.jsx'
import './index.less';

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
let WrapApp = connect()(App);

render(
  <Provider store={store}>
    <WrapApp></WrapApp>
  </Provider>,
  document.getElementById('app')
);
