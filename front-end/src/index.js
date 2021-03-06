import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './redux/reducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/saga/rootSaga'

const sagaMidlleware = createSagaMiddleware();

const defaultValue = { isAuthorized: false, user: {}, loginNameEmailError: null, loginPasswordError: null, registerNameError: null, registerEmailError: null, dbError: null, appThreads: null, mainThreads: null, successfulThreadCreate: false, mainDebates: null, appDebates: null, successfulDebateCreate: null, canWriteComment: true, commentWritingTimeout: null };

const store = createStore(reducer, defaultValue, composeWithDevTools(applyMiddleware(sagaMidlleware)));

sagaMidlleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
