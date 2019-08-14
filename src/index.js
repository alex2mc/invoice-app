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
import invoicesReducer from './store/reducers/invoices';
import { reducer as formReducer } from 'redux-form'
import { rootEpic } from './store/epics/index';

import {createMuiTheme} from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
  product: productsReducer,
  customer: customersReducer,
  invoice: invoicesReducer,
  form: formReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);


const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#b2dfdb',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#d1c4e9',
      main: '#b39ddb',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#e3f2fd',
    },
    red: {
      main: '#ef5350'
    },

  },
});

const app = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Provider>
);




ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
