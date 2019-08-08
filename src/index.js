import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import App from './TestApp';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware,  compose, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';

import customersReducer from './store/reducers/customers';
import productsReducer from './store/reducers/products';
import { rootEpic } from './store/epics/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
  product: productsReducer,
  customer: customersReducer,

});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
