import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import CreateStore from './store'

const store = CreateStore()

const root = <Provider store={store}>
  <App />
</Provider>

ReactDOM.render(
  root,
  document.getElementById('root')
);

// TODO
// registerServiceWorker();
